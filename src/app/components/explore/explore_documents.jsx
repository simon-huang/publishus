import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import CopiedFrom from '../commonComponents/copiedFrom.jsx'

export class ExploreDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.openDoc = this.openDoc.bind(this);
  }

  openDoc(e) {
    e.preventDefault();
    browserHistory.push(`/profile/${this.props.docData.docOwner}/${this.props.docData.docID}`);
  }

  render() {
    return (
      <div>
        <h4 className="doc-list-title bold" onClick={this.openDoc}>{this.props.docData.docName}</h4>
        <div>By: {this.props.docData.docOwner}</div>
        <CopiedFrom docData={this.props.docData}/>
        <br/>
        <div>{this.props.docData.docDescription}</div>
        <hr/>
      </div>
    );
  }
};

export default connect(state => state)(ExploreDocuments);