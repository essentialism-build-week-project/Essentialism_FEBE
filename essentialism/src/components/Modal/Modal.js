import { Box, Button, Heading, Paragraph, TextArea } from "grommet";
import React, { Component } from "react";
import Modal from "react-responsive-modal";

export default class ModalView extends Component {
  state = {
    open: true,
    desc: "",
    submittedDesc: ""
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

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submittedDesc: this.state.desc, desc: "" }, () =>
      this.props.handleModalSubmit(this.state.submittedDesc)
    );

    this.onCloseModal();
  };

  render() {
    const { open } = this.state;
    return (
      <Box>
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
}
