import React from 'react';
import _ from 'lodash';


export default class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: '',
            textValue: '',
            listVisible: true
        };

        this.selectOption = optionText => {
            this.setState({ textValue: optionText, listVisible: false });
            this.setState({ searchString: optionText });
            this.getSelectedValue(optionText);
        };

        this.getSelectedValue = optionText => {
            if (typeof this.props.displayFilteredData === 'function') {
                this.props.displayFilteredData(optionText, this.props.filterKey );
            }
        };
        this.handleChange = event => {
            this.setState({ listVisible: true });
            this.setState({ searchString: event.target.value });
            if(event.target.value === '') {
                if (typeof this.props.clearFilteredData === 'function') {
                    this.props.clearFilteredData();
                }
            }
        };
        this.renderListItems = (values, inputString, selectedValue) => {
            const searchString = inputString.toString().toLowerCase();
            let result;
            const self = this;
            
            if (searchString.length > 0) {               
                result= _.filter(values,function(o) { return _.startsWith( (self.props.filterKey ==="name"? o.name: o.Country).toLowerCase() ,(searchString))});
            }

            const items = this.showObject(result, selectedValue);
            return items;
        };

        this.showObject = (content, selectedValue) => {
            const self = this;
            let items = [];            
             let ordered = [], selectedItem;

            if (Array.isArray(content)) {
                items = content.map(function(obj, index) {
                    selectedItem = self.props.filterKey ==="name"? obj.name: obj.Country;
                    return (
                        <div
                            className={selectedItem ? 'selectedOption' : 'options'}
                            key={index}
                            onClick={() => self.selectOption(selectedItem)}
                        >
                            {selectedItem}
                        </div>
                    );
                });
                return items;
            }
        };
    }

    componentDidMount() {
        const self = this;
        document.body.addEventListener('click', function(e) {
            if (self.state.listVisible) {
                const target = self.refs.autosuggestContainer;
                if (typeof target !== 'undefined') {
                    if (!target.contains(e.target)) {
                        self.setState({ listVisible: false });
                        self.setState({ searchString: '' });
                    }
                }
            }
        });
    }

    componentUnMount() {
        document.body.removeEventListener('click');
    }
    componentWillReceiveProps(newProps) {
        const props = newProps;
    }

    render() {
        const values = this.props.value;
        const SelectedValue = this.state.textValue;
        const searchString = this.state.searchString;
        //  const displaySelectedValue =  (!this.state.listVisible && SelectedValue !== 'undefined')? SelectedValue: '';

        return (
            <div ref="autosuggestContainer" className="autosuggest">
                <div className={'autosuggest-container' + (this.state.listVisible ? ' showOptions' : '')}>
                    <div
                        className={'autosuggest-display' + (this.state.listVisible ? ' clicked' : '')}
                        onChange={this.showOptions}
                    >
                        <span
                            className="spanautosuggest"
                            onClick={() => this.getSelectedValue(this.state.searchString)}
                        >
                            <input
                                type="text"
                                className="autosuggestText"
                                value={this.state.searchString}
                                onChange={event => this.handleChange(event)}
                                placeholder="Type here"
                            />
                        </span>
                    </div>
                    {this.state.listVisible && searchString !== ''
                        ? <div className="autosuggest-list">
                              <div className="container">
                                  {this.renderListItems(values, this.state.searchString, SelectedValue)}
                              </div>
                          </div>
                        : null}
                </div>
            </div>
        );
    }
}
