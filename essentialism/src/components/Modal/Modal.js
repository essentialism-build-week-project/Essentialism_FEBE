import { Box, Button, Form, Heading, Paragraph, TextArea, Text } from 'grommet';
import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { WrapperColumn } from '../Global.Styles';

export default class ModalView extends Component {
    state = {
        open: true,
        desc: '',
        submittedDesc: '',
        errors: ''
    };

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    
    handleValidate = () => {
        let isError = false;
        const errors = {
            descError: "",
        };
        
    if (!this.state.desc) {
        isError = true;
        errors.descError = "A description is required";
    }
    
    this.setState(errors);
    
    return isError;
};

handleSubmit = e => {
    e.preventDefault();
    const err = this.handleValidate()

    if(!err) {
        this.setState({ submittedDesc: this.state.desc, desc: '' }, () =>
            this.props.handleModalSubmit(this.state.submittedDesc)
        );

        this.onCloseModal();
    }
};

<<<<<<< HEAD
  render() {
    const { open } = this.state;
    return (
      <Box animation="pulse">
        <Modal open={open} onClose={this.onCloseModal} center>
          <Heading>Zen-like Essentialism has been acheived!</Heading>
          <Paragraph>
            Breifly describe in a few sentences why you selected the top three
            values and projects that you did.
          </Paragraph>
          <form onSubmit={this.handleSubmit}>
            <TextArea
              value={this.state.desc}
              onChange={this.handleChange}
              name="desc"
              placeholder="Enter description"
            />
            <Button label="Submit" type="submit" color="#00739D" />
          </form>
        </Modal>
      </Box>
    );
  }
=======
    render() {
        const { open } = this.state;
        return (
            <Box>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <WrapperColumn>
                        <Heading margin="xsmall" color="brand">
                            Why?
                        </Heading>
                        {/* <Heading margin="xsmall" color="brand">
                            has been acheived!
                        </Heading> */}
                        <Paragraph margin="medium">
                            Breifly describe why you chose these top three values and projects and express why they are essential to you.
                        </Paragraph>
                        <Form onSubmit={this.handleSubmit}>
                            <WrapperColumn>
                                <TextArea
                                    value={this.state.desc}
                                    onChange={this.handleChange}
                                    name="desc"
                                    placeholder="Enter description"
                                    rows="15"
                                    cols="40"
                                />
                                <Text color='#FF4040' margin='small' textAlign='center'>{this.state.descError}</Text >
                                <Button
                                    primary
                                    label="Submit"
                                    type="submit"
                                    margin="large"
                                    />
                            </WrapperColumn>
                        </Form>
                    </WrapperColumn>
                </Modal>
            </Box>
        );
    }
>>>>>>> e94e480963e3284537c9bf78e9d23b68b8ff7609
}
