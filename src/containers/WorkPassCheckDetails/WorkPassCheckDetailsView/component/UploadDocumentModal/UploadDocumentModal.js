import React, { Component } from 'react';
import Modal from 'react-modal'
import Icon from 'components/Icon'
import ColorButton from 'components/ColorButton'
import '../../style.css'
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        border: '1px solid rgba(0,0,0,.2)',
        boxShadow: '0 3px 9px rgba(0,0,0,.5)',
        background: 'rgb(255, 255, 255)',
        borderRadius: '6px',
        outline: 'none',
        padding: '0px',
        minWidth: '500px'
    }
}
const initialState = {
    referencetype: "",
    referenceversion: "",
    checkid: "",
    description: []
}

class UploadDocumentModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: initialState,
            isValid:true,
            numberOfFiles:''
        }
        this.fileUploader = this.fileUploader.bind(this)
    }



    componentWillMount() {
        Modal.setAppElement('body')
        this.setState({
            data: {
                ...this.state.data,
                referencetype: this.props.type,
                referenceversion: this.props.referenceVersion,
                checkid: this.props.checkId
            }
        })
    }
    uploadDocuments = () => {
        const {data}=this.state
        let valid;
        if(data.description.length>0){
          valid=true;
        }
        if(valid) {
            const { data } = this.state
            this.props.addDocuments({data})
            this.setState({
                data: initialState
            })
            this.props.handleCloseModal(this.props.type) 
        } else {
           
            this.setState({
                isValid: false
            })
        }
        
    }


    //   fileUploader=(event)=>{
    //     var files=event.target.files;
    //     var arrayOfObjects = [];
    //     for (var i = 0; i < files.length; i++) { //for multiple files          
    //         (function(file) {
    //             var reader = new FileReader();  

    //             reader.onload = function(e) {  
    //                 // get file content  
    //                 var text = e.target.result; 
    //                 arrayOfObjects.push(text)
    //             }

    //             reader.readAsDataURL(file);
    //         })(files[i]);

    //     }
    //    console.log(arrayOfObjects)
    //   }
    async fileUploader(event) {
        let files = [...event.target.files];
        let images = await Promise.all(files.map(file => {
            return new Promise((resolve, reject) => {
                let fileReader = new FileReader();
                fileReader.onload = function () {
                    //   return resolve({data:fileReader.result, name:file.name, size: file.size, type: file.type});
                    return resolve({ image: fileReader.result, imagename:(file.name).split('.').slice(0,-1).join('.') });
                }
                fileReader.readAsDataURL(file);
                fileReader.onerror = error => reject(error);

            })
        }));
        this.setState({
            numberOfFiles:images.length,
            data: {
                ...this.state.data,
                description: images
            }
        })
    }



    render() {
        const { isOpen, handleCloseModal, type} = this.props;
        const { isValid,numberOfFiles } = this.state
        return (
            <Modal
                isOpen={isOpen}
                onRequestClose={handleCloseModal}
                style={customStyles}
                contentLabel="Example Modal"
                overlayClassName={{
                    afterOpen: 'myOverlayClass_after-open'
                }}
            >
                <div className="modal-dialog">


                    <div className="modal-content">


                        <div className="modal-header">

                            <h3 className="modal-title">Upload Documents</h3>
                            <div onClick={() => handleCloseModal(type)} className=" closeButtonContainer" >
                                <Icon color="#7F8DAA" type="close" />
                            </div>
                        </div>


                        <div className="modal-body">
                            <div className="body-message">
                                <div className="form-group row">
                                    <label className={`col-md-4 btn-label col-form-label ${isValid ? "" : "required-error"}` }>Upload Documents</label>
                                    <div className="col-md-8">
                                        <div className="btn-custom-file-upload">
                                            <label>
                                                <input
                                                    type="file"
                                                    onChange={this.fileUploader}
                                                    accept="application/pdf, image/jpeg" multiple
                                                />
                                                <span className="btn-placeholder">{numberOfFiles ? `${numberOfFiles} ${`Files`}` : 'Click here to upload files (PDF or Image only)'}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>


                        <div className="modal-footer">
                            <ColorButton color="green" onClick={this.uploadDocuments}>Save</ColorButton>
                        </div>
                    </div>


                </div>

            </Modal>
        )
    }

}

export default UploadDocumentModal;