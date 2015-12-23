'use strict';
const LinkState = require('../../helpers/link-state');
const ObjectAssign = require('object-assign');
const React = require('react');
const SelectControl = require('../form/select-control.jsx');
const TextControl = require('../form/text-control.jsx');


const propTypes = {
    children: React.PropTypes.node,
    defaultValues: React.PropTypes.object,
    loading: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    query: React.PropTypes.object
};


class FilterFormProvider extends React.Component {
    constructor(props) {

        super(props);

        this.state = ObjectAssign({}, props.defaultValues, props.query);
    }

    componentWillReceiveProps(nextProps) {

        const nextState = ObjectAssign({}, nextProps.defaultValues, nextProps.query);

        this.setState(nextState);
    }

    onMenuChange(event) {

        this.setState({ page: 1 }, this.props.onChange.bind(this));
    }

    onEnterSubmit(event) {

        if (event.which === 13) {
            event.preventDefault();
            event.stopPropagation();

            this.setState({ page: 1 }, this.props.onChange.bind(this));
        }
    }

    changePage(page) {

        this.setState({ page }, this.props.onChange.bind(this));
    }

    decorateFormControls(children) {

        return React.Children.map(children, (child) => {

            const isValidElement = React.isValidElement(child);
            const props = {};

            if (isValidElement && child.type === SelectControl) {
                props.value = this.state[child.props.name];
                props.onChange = LinkState.bind(this, this.onMenuChange.bind(this));
                props.disabled = this.props.loading;
            }

            if (isValidElement && child.type === TextControl) {
                props.value = this.state[child.props.name];
                props.onChange = LinkState.bind(this);
                props.disabled = this.props.loading;
            }

            if (child.hasOwnProperty('props')) {
                props.children = this.decorateFormControls(child.props.children);

                return React.cloneElement(child, props);
            }

            return child;
        });
    }

    render() {

        return (
            <form
                onKeyDown={this.onEnterSubmit.bind(this)}
                onSubmit={this.props.onChange}>

                {this.decorateFormControls(this.props.children)}
            </form>
        );
    }
}

FilterFormProvider.propTypes = propTypes;


module.exports = FilterFormProvider;
