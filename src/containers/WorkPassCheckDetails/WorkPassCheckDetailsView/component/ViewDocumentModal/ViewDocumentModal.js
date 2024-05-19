import React, { Component } from "react";
import Modal from "react-modal";
import Icon from "components/Icon";
import Button from "components/Button";
import AliceCarousel from "react-alice-carousel";
import { notify } from "react-notify-toast";
import { NOTIFICATION_TIMEOUT } from "containers/constants";
import "../../style.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    border: "1px solid rgba(0,0,0,.2)",
    boxShadow: "0 3px 9px rgba(0,0,0,.5)",
    background: "rgb(255, 255, 255)",
    borderRadius: "6px",
    outline: "none",
    padding: "20px",
    minWidth: "550px",
    maxWidth: "550px",
    maxHeight: "600px",
  },
};

const initialState = {
  referencetype: "",
  referenceversion: "",
  checkid: "",
};

class ViewDocumentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: initialState,
      uploaded_images: [],
      mobileuploads:[],
      carouselCurrentImg: "",
      carouselImgIndex: 0,
      isfetching: true,
      isDocumentDeleted: false
    };
    //this.onSlideChange = this.onSlideChange.bind(this);
    //this.onSlideChanged = this.onSlideChanged.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement("body");
    this.setState({
      payload: {
        referencetype: this.props.type,
        referenceversion: this.props.referenceVersion,
        checkid: this.props.checkId,
      },
    });
  }

  componentDidMount() {
    let payload = this.state.payload;
    let imagesArray = []
    let mobileuploads = []
    if ((this.props.type === 'directorship_checks' || this.props.type === 'administrator_uploads' || this.props.type === 'dbs_identity'
    || this.props.type === 'right_to_work' || this.props.type === 'candidate_uploads') && this.props.uploaded_documents.length > 0) {
      this.props.uploaded_documents.map((itm) => {
        if (Array.isArray(itm.snapshot)) {
          if (itm.snapshot[0].hasOwnProperty("data")) {
            if (itm.snapshot[0].data.hasOwnProperty("Imageurl")) {
              itm.snapshot[0].data.Imageurl.map((item) => {
                imagesArray.push(item)
              })
            }
          } else if (itm.snapshot[0].hasOwnProperty("url")) {
            let uploaded_doc = {"url" : itm.snapshot[0].url}
            imagesArray.push(uploaded_doc)
            mobileuploads.push(itm.snapshot[0].url)
          }
        }
      })
      if (imagesArray.length > 0) {
        this.setState({
          uploaded_images: imagesArray,
          carouselCurrentImg: imagesArray[0].url,
          mobileuploads : mobileuploads
        });
      }
    //   if(this.props.uploaded_documents[0].snapshot[0].data.Imageurl[0] !== undefined){
    //   this.setState({
    //     uploaded_images: this.props.uploaded_documents[0].snapshot[0].data.Imageurl,
    //     carouselCurrentImg: this.props.uploaded_documents[0].snapshot[0].data.Imageurl[0].url,
    //   });
    // }
    } else {
      this.props.viewUploadedDocuments({ payload });
    }
  }

  componentWillReceiveProps(nextProps) {
    let imagesArray= []
    if (this.props.type === 'directorship_checks' || this.props.type === 'administrator_uploads' || this.props.type === 'dbs_identity'
    || this.props.type === 'right_to_work' || this.props.type === 'candidate_uploads') {
      if (nextProps.uploaded_documents.length > 0) {
        // if(nextProps.uploaded_documents[0].snapshot[0].data.Imageurl[0] !== undefined){
        //   this.setState({
        //     uploaded_images: nextProps.uploaded_documents[0].snapshot[0].data.Imageurl,
        //     carouselCurrentImg: nextProps.uploaded_documents[0].snapshot[0].data.Imageurl[0].url,
        //   });
        // }
        // else{
        //   this.setState({
        //     uploaded_images: [],
        //     carouselCurrentImg: "",
        //   });
        // }
        nextProps.uploaded_documents.map((itm) => {
          if (itm.snapshot[0].hasOwnProperty("data")) {
            if (itm.snapshot[0].data.hasOwnProperty("Imageurl")) {
              itm.snapshot[0].data.Imageurl.map((item) => {
                imagesArray.push(item)
              })
              //imagesArray.push(itm.snapshot[0].data.Imageurl)
            }
          } else if (itm.snapshot[0].hasOwnProperty("url")) {
            let x = {"url" : itm.snapshot[0].url}
            imagesArray.push(x)
          }
        })
        if (imagesArray.length > 0) {
          this.setState({
            uploaded_images: imagesArray,
            carouselCurrentImg: imagesArray[0].url,
          });
        } else {
          this.setState({
            uploaded_images: [],
            carouselCurrentImg: "",
          });
        }
      }
    } else {
      if (nextProps.uploaded_documents !== this.props.uploaded_documents &&
        nextProps.uploaded_documents.Imagedata !== undefined) {
        let img_data = JSON.parse(
          nextProps.uploaded_documents.Imagedata.snapshot
        );
          if (
            img_data[0].hasOwnProperty("Imageurl") &&
            img_data[0].Imageurl.length > 0
          ) {
            this.setState({
              uploaded_images: img_data[0].Imageurl,
              carouselCurrentImg: img_data[0].Imageurl[0].url,
            });
          }
          else{
            this.setState({
              uploaded_images: [],
              carouselCurrentImg: "",
            });
          }
        }
    }
  }

  onSlideChange = (e) => {
    //console.log("onSlideChange ", e.item);
    //console.log("onSlideChange ", e.slide);
  };

  onSlideChanged = (e) => {
    let carouselImgIndex = e.item;

    let uploaded_images = this.state.uploaded_images;
    var imagesArray = [];
    {
      uploaded_images.map((item, idx) => {
        if (Array.isArray(item)) {
          {
            item.map((item) => {
              imagesArray.push(item.url);
            });
          }
        } else {
          imagesArray.push(item.url);
        }
      });
    }
    this.setState({
      carouselImgIndex: carouselImgIndex,
      carouselCurrentImg: imagesArray[carouselImgIndex],
    });
  };

  deleteDoc = () => {
    let payload = this.state.payload;
    payload["imageurltodelete"] = this.state.carouselCurrentImg;

    const { requestId, orgId, candidateId, checkId, type, handleCloseModal, idx} = this.props
    let fetchData = {
      orgId: orgId,
      candidateId: candidateId,
      requestId: requestId,
      checkId: checkId,
      check_type: type
    }
    this.props.deleteDocuments(
      payload,
      () => {
        this.setState({isDocumentDeleted: true})
        notify.show(
          "Document deleted successfully!!",
          "success",
          NOTIFICATION_TIMEOUT
        );
        window.setTimeout(() => {
          handleCloseModal(idx)
        }, 2000)
      },
      () =>
        notify.show(
          "Failed to delete document!!",
          "error",
          NOTIFICATION_TIMEOUT
        ),
        fetchData
    );
    this.setState({
      carouselImgIndex: 0,
      carouselCurrentImg: this.state.uploaded_images[0].url,
    });
  };

  render() {
    const { isOpen, handleCloseModal, idx } = this.props;
    let uploaded_images = this.state.uploaded_images;
    const { isfetching } = this.state;

    var imagesArray = [];
    {
      uploaded_images.map((item, idx) => {
        if (Array.isArray(item)) {
          {
            item.map((item) => {
              imagesArray.push(item.url);
            });
          }
        } else {
          imagesArray.push(item.url);
        }
      });
    }
    const imgArray = imagesArray.map((m, idx) => {
      var extension = m.split(".").pop();

      if (extension === "pdf") {
        return (
          <a
            href={m}
            key={idx}
            target="_blank"
            title="Click to open document in new tab."
            className="linkwrap"
          >
            <div className="blocker"></div>
            <iframe
              width="400"
              className="iframe"
              height="500"
              src={m}
              frameBorder="0"
            ></iframe>
          </a>
        );
      } else {
        return (
          <a key={idx} href={m} target="_blank" title={m}>
            <img src={m} className="sliderimg" alt="m" />
          </a>
        );
      }
    });

    const responsive = {
      0: { items: 1 },
      1024: { items: 1 },
    };
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName={{
          afterOpen: "myOverlayClass_after-open",
        }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Uploaded Documents</h3>
              <div
                onClick={() => handleCloseModal(idx)}
                className="closeButtonContainer"
              >
                <Icon color="#7F8DAA" type="close" />
              </div>
            </div>

            <div className="modal-body">
              <div className="modal-div">
                {(imgArray.length > 0 )? (
                  <div>
                    <div style={{visibility: this.state.isDocumentDeleted ? "hidden" : "visible"}}>
                    <AliceCarousel
                      autoPlayInterval={2000}
                      responsive={responsive}
                      autoPlayDirection="rtl"
                      fadeOutAnimation={true}
                      mouseTrackingEnabled={true}
                      disableAutoPlayOnAction={true}
                      startIndex={this.state.carouselImgIndex}
                      slideToIndex={this.state.carouselImgIndex}
                      onSlideChange={this.onSlideChange}
                      onSlideChanged={this.onSlideChanged}
                    >
                      {imgArray}
                    </AliceCarousel>
                    </div>
                    {
                      this.state.mobileuploads.includes(this.state.carouselCurrentImg) ?
                      null
                      :
                      <Button
                        color="white"
                        onClick={() => this.deleteDoc()}
                        className="delete-doc-button"
                        disabled={!this.props.isEditable}
                      >
                        Delete Document
                      </Button>
                    }
                  </div>
                ) : (
                  <div>
                    {this.props.type === 'directorship_checks' || this.props.type === 'administrator_uploads' || this.props.type === 'dbs_identity'
                      || this.props.type === 'right_to_work' || this.props.type === 'candidate_uploads' ? 
                   <div> {this.state.uploaded_images.length === 0 ? <div className="no_document">No Uploaded Document.</div>: "" }</div>
                    :
                    <div> {this.state.uploaded_images.length === 0 && this.props.uploaded_documents.Imagedata !== undefined ? <div className="no_document">No Uploaded Document.</div>: "" }</div>
                    }
                    </div>                  
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default ViewDocumentModal;
