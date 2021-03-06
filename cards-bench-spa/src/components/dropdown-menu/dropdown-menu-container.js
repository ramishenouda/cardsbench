import React, { Component } from 'react';

import DropDownMenuView from './dropdown-menu-view'

class DropDownMenu extends Component {
    state = {
        toggle: false
    }

    EventListenerFunction = (event) => {
        if (!event.target.matches('.dropdown-toggle')) {
            this.toggleDropDownMenu(false);
        } else {
            this.setState({ toggle:false })
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.EventListenerFunction, false)
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.EventListenerFunction, false);
    }

    toggleDropDownMenu = (event) => {
        if (event === false || this.state.toggle === true) {
            this.setState({ toggle: false });
        }

        else if (event === 'dropdown-toggle') {
            setTimeout(() => {
                this.setState({ toggle: true });
            }, 30);
        }
    }

    render() {
        const menuItems = this.props.dropDownMenuItems.map((item, index) => 
            <span className="mb-1" key={index} onClick={() => this.toggleDropDownMenu('dropdown-toggle')}> { item } </span>
        );

        return (
          <DropDownMenuView
            text={this.props.text}
            dropDownMenuItems={menuItems}
            toggleDropDownMenu={this.toggleDropDownMenu}
            toggle={this.state.toggle}
            style={this.props.style}
          />
        );
    }
}

export default DropDownMenu;
