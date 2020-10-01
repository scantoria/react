import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, Breadcrumb, 
    BreadcrumbItem, Button, Modal, ModalBody, ModalHeader, 
    Row, Col, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const required = val => val && val.length;
const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render(){
        return(
            <React.Fragment>
                <Button className="btn btn-light" outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil"/> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader  toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col>
                                <Label htmlFor="rating">Rating</Label>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Control.select model=".select" 
                                        id="rating" 
                                        name="rating"
                                        className="form-control">
                                            <option value="5">5</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                <Label >Name</Label>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Control.text model=".name" 
                                        id="name" 
                                        name="name"
                                        placeholder="Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(25)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: "Required",
                                            minLength: "Must be at least 2 characters",
                                            maxLength: "No longer than 25 characters"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                <Label>Comment</Label>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Control.textarea model=".comment" 
                                        id="comment" 
                                        name="comment"
                                        placeholder="Comments"
                                        className="form-control">
                                        validators={{
                                            required,
                                            minLength: minLength(15),
                                            maxLength: maxLength(1000)
                                        }}
                                    </Control.textarea>
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: "Required",
                                            minLength: "Must be at least 15 characters",
                                            maxLength: "No longer than 1000 characters"
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col className="col-3">
                                    <Control.button model=".submit" 
                                        id="submit" 
                                        name="submit"
                                        placeholder="Submit"
                                        className="form-control btn btn-primary">Submit
                                    </Control.button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>   
            </React.Fragment>
        );
    }
}

function RenderCampsite({campsite}){
    return(
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments, addComment, campsiteId}){
    if(comments){
        return(
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comments => 
                <div key={comments.id}>
                    <div>{comments.text}</div>
                    <p className="font-italic">--{comments.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.date)))}</p>
                </div>
                )}
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
            </div>
        );
    } 

    return(
        <div />
    );
}

function CampsiteInfo(props){
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    
    if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }

    if(props.campsite){
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments 
                        comments={props.comments} 
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                    
                </div>
            </div>
        );
    }
    
    return <div />;
}


export default CampsiteInfo;