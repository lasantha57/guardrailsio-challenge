import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class CustomDropdown extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            selected: props.options[0]
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (this.state.selected && newProps.selectedId !== this.state.selected.id) {
            const selected = newProps.options.find((element) => {
                return element.id === newProps.selectedId;
            });
            if (selected) {
                this.setState({
                    selected
                });
            }
        }
    }

    handleChange = (value) => {
        this.setState({
            selected: value
        })
        this.props.handleOnSelected(value, this.props.type);
    }

    toggle = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    render() {
        const { isOpen, selected } = this.state;
        const { options, disabled } = this.props;

        return (
            <Dropdown isOpen={isOpen} toggle={this.toggle}>
                <DropdownToggle disabled={disabled} color={'white'} className="border w-100 text-left">{selected ? selected.name : ''}</DropdownToggle>
                <DropdownMenu right className="w-100">
                    {options.map((value, index) => {
                        return <DropdownItem active={selected && value.id === selected.id} key={index} onClick={() => this.handleChange(value)}>
                            {value.name}
                        </DropdownItem>
                    })}
                </DropdownMenu>
            </Dropdown>
        );
    }
}

CustomDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    handleOnSelected: PropTypes.func.isRequired,
    disabled: PropTypes.bool
}

export default CustomDropdown;
