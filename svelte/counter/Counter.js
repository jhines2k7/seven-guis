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
	style.textContent = "       \r\n\t.button[svelte-1228929677], [svelte-1228929677] .button {\r\n\t  display: inline-block;\r\n\t  -webkit-box-sizing: content-box;\r\n\t  -moz-box-sizing: content-box;\r\n\t  box-sizing: content-box;\r\n\t  cursor: pointer;\r\n\t  padding: 10px 20px;\r\n\t  border: 1px solid #018dc4;\r\n\t  -webkit-border-radius: 3px;\r\n\t  border-radius: 3px;\r\n\t  font: normal medium/normal \"Arial Black\", Gadget, sans-serif;\r\n\t  color: rgba(255,255,255,0.9);\r\n\t  -o-text-overflow: clip;\r\n\t  text-overflow: clip;\r\n\t  background: #0199d9;\r\n\t  -webkit-box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) ;\r\n\t  box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) ;\r\n\t  text-shadow: -1px -1px 0 rgba(15,73,168,0.66) ;\r\n\t  -webkit-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t  -moz-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t  -o-transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t  transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t}\r\n\r\n\t.button[svelte-1228929677]:hover, [svelte-1228929677] .button:hover {\r\n\t  border: 1px solid #007cad;\r\n\t  background: rgba(0,142,198,1);\r\n\t  -webkit-box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.3) ;\r\n\t  box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.3) ;\r\n\t  -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t  -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t  -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t}\r\n\r\n\t.button[svelte-1228929677]:active, [svelte-1228929677] .button:active {\r\n\t  border: 1px solid #018dc4;\r\n\t  background: #00a6e8;\r\n\t  -webkit-box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2) inset;\r\n\t  box-shadow: 0 1px 4px 0 rgba(0,0,0,0.2) inset;\r\n\t  text-shadow: none;\r\n\t  -webkit-transition: all 50ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t  -moz-transition: all 50ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t  -o-transition: all 50ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t  transition: all 50ms cubic-bezier(0.42, 0, 0.58, 1);\r\n\t}\r\n\r\n\tspan[svelte-1228929677], [svelte-1228929677] span {\r\n\t\tfont-family: \"Arial Black\", Gadget, sans-serif\r\n\t}\r\n";
	document.head.appendChild( style );

	addedCss = true;
}

function renderMainFragment ( root, component, target ) {
	var span = document.createElement( 'span' );
	span.setAttribute( 'svelte-1228929677', '' );
	
	var text = document.createTextNode( root.count );
	span.appendChild( text );
	
	target.appendChild( span )
	
	var text1 = document.createTextNode( "\r\n\r\n" );
	target.appendChild( text1 );
	
	var button = document.createElement( 'button' );
	button.setAttribute( 'svelte-1228929677', '' );
	button.className = "button";
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
			if ( detach ) span.parentNode.removeChild( span );
			
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
