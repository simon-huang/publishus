import React from 'react';

// UI
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';

// Components
import DocContents from './doc_contents.jsx'

export default class Doc_details extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="doc-details mt10 mb10">
        <div className="row">
          <div className="col-sm-12">
            <div className="row mt10">
              <div className="col-sm-12">
                <div className="doc-desc">
                  <p>The diagnosis of pancreatic neuroendocrine tumours (PanNETs) is increasing owing to more sensitive detection methods, and this increase is creating challenges for clinical management.</p>
                </div>
              </div>  
            </div>
            <div className="row mt15">
              <div className="col-sm-8">
                <div className="doc-desc-metrics text-center">
                  <div className="row">
                    <div className="col-sm-3">
                      <p>324 saves</p>
                    </div>
                    <div className="col-sm-3">
                      <p>7 copies made</p>
                    </div>
                    <div className="col-sm-3">
                      <p>29 contributors</p>
                    </div>
                    <div className="col-sm-3">
                      <p>Private</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-4 text-right">
                <ButtonGroup>
                  <Button>Merge</Button>
                  <Button>Copy</Button>
                </ButtonGroup>
              </div>
            </div>
            <div className="row mt15">
              <div className="col-sm-12">
                <DocContents />
              </div>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}








