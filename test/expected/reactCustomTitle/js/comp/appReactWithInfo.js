/** @jsx React.DOM */



/*
 * @example
 * React.render(
 *     React.createElement(MenuExample, {items:  ['Home', 'Services', 'About', 'Contact us'] }),
 *     document.body
 * );
 * 
 * @tags tag1, tag2
 */

/*
 * @description
 * This is a brand new component
 */

var MenuExample = React.createClass({displayName: "MenuExample",

    getInitialState: function(){
        return { focused: 0 };
    },

    clicked: function(index){

        // The click handler will update the state with
        // the index of the focused menu entry

        this.setState({focused: index});
    },

    render: function() {

        // Here we will read the items property, which was passed
        // as an attribute when the component was created

        var self = this;

        // The map method will loop over the array of menu entries,
        // and will return a new array with <li> elements.

        return (
            React.createElement("div", null, 
                React.createElement("ul", null,  this.props.items.map(function(m, index){
        
                    var style = '';
        
                    if(self.state.focused == index){
                        style = 'focused';
                    }
        
                    // Notice the use of the bind() method. It makes the
                    // index available to the clicked function:
        
                    return React.createElement("li", {className: style, onClick: self.clicked.bind(self, index)}, m);
        
                }) 
                        
                ), 
                
                React.createElement("p", null, "Selected: ", this.props.items[this.state.focused])
            )
        );

    }
});