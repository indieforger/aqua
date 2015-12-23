'use strict';
const FilterFormProvider = require('../../../../components/admin/filter-form-provider.jsx');
const React = require('react');
const SelectControl = require('../../../../components/form/select-control.jsx');
const TextControl = require('../../../../components/form/text-control.jsx');


const propTypes = {
    loading: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    query: React.PropTypes.object
};
const defaultValues = {
    username: '',
    sort: '_id',
    limit: '20',
    page: '1'
};


class FilterForm extends React.Component {
    render() {

        const formElements = <div className="row">
            <div className="col-sm-4">
                <TextControl name="username" label="Username search" />
            </div>
            <div className="col-sm-4">
                <SelectControl name="sort" label="Sort by">
                    <option value="_id">id &#9650;</option>
                    <option value="-_id">id &#9660;</option>
                    <option value="user.name">username &#9650;</option>
                    <option value="-user.name">username &#9660;</option>
                </SelectControl>
            </div>
            <div className="col-sm-4">
                <SelectControl name="limit" label="Limit">
                    <option value="10">10 items</option>
                    <option value="20">20 items</option>
                    <option value="50">50 items</option>
                    <option value="100">100 items</option>
                </SelectControl>
            </div>
        </div>;

        return (
            <FilterFormProvider
                ref={(c) => (this.provider = c)}
                loading={this.props.loading}
                query={this.props.query}
                defaultValues={defaultValues}
                onChange={this.props.onChange}>

                {formElements}
            </FilterFormProvider>
        );
    }
}

FilterForm.propTypes = propTypes;


module.exports = FilterForm;
