var Counter = (function () { 'use strict';

var template = (function () {
	return {
		data() {
			return {
				count: 0
			};
		}
	};
}());

let addedCss = false;
function addCss () {
	var style = document.createElement( 'style' );
	style.textContent = "       \r\n\t.button[svelte-1966659286], [svelte-1966659286] .button {\r\n\t    background-color: #4CAF50; \r\n\t    border: none;\r\n\t    color: white;\r\n\t    padding: 15px 32px;\r\n\t    text-align: center;\r\n\t    text-decoration: none;\r\n\t    display: inline-block;\r\n\t    font-size: 16px;\r\n\t    border-radius: 4px;\r\n\t    transition-duration: 0.4s;\r\n\t}\r\n\r\n\t.bordered-button[svelte-1966659286], [svelte-1966659286] .bordered-button {\r\n\t\tbackground-color: white;\r\n    \tcolor: black;\r\n    \tborder: 2px solid #4CAF50; \r\n\t}\r\n\r\n\t.button[svelte-1966659286]:hover, [svelte-1966659286] .button:hover {\r\n\t    background-color: #4CAF50; \r\n\t    color: white;\r\n\t}\r\n";
	document.head.appendChild( style );

	addedCss = true;
}

function renderMainFragment ( root, component, target ) {
	var text = document.createTextNode( root.count );
	target.appendChild( text );
	
	var text1 = document.createTextNode( "\r\n\r\n" );
	target.appendChild( text1 );
	
	var button = document.createElement( 'button' );
	button.setAttribute( 'svelte-1966659286', '' );
	button.className = "button bordered-button";
	function clickHandler ( event ) {
		var root = this.__svelte.root;
		
		component.set({ count: root.count + 1 });
	}
	
	button.addEventListener( 'click', clickHandler, false );
	button.__svelte = {
		root: root
	};
	
	var text2 = document.createTextNode( "Count" );
	button.appendChild( text2 );
	
	target.appendChild( button )

	return {
		update: function ( changed, root ) {
			text.data = root.count;
			
			button.__svelte.root = root;
		},

		teardown: function ( detach ) {
			if ( detach ) text.parentNode.removeChild( text );
			
			if ( detach ) text1.parentNode.removeChild( text1 );
			
			button.removeEventListener( 'click', clickHandler, false );
			if ( detach ) button.parentNode.removeChild( button );
			
			if ( detach ) text2.parentNode.removeChild( text2 );
		}
	};
}

function Counter ( options ) {
	var component = this;
	var state = Object.assign( template.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( const key in group ) {
			if ( !( key in newState ) ) continue;

			const newValue = newState[ key ];
			const oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			const callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( let i = 0; i < callbacks.length; i += 1 ) {
				const callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return state[ key ];
	};

	this.set = function set ( newState ) {
		const oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options = {} ) {
		const group = options.defer ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel () {
				const index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		const handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				const index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	if ( !addedCss ) addCss();
	
	var mainFragment = renderMainFragment( state, this, options.target );
}

return Counter;

}());
