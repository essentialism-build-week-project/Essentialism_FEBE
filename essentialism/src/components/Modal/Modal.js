import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

export default class ModalView extends Component {
    state = {
        open: false,
        desc: '',
        submittedDesc: ''
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

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('Submitted', this.state.desc)
        this.setState({ submittedDesc: this.state.desc})
        
        this.onCloseModal()
    }

    render() {
        const { open } = this.state;
        return (
            <div>
                {open ? (
                    <Modal open={open} onClose={this.onCloseModal} center>
                        <h2>Zen-like Essentialism has been acheived!</h2>
                        <p>
                            Breifly describe in a few sentences why you selected
                            the top three values and projects that you did.
                        </p>
                        <form onSubmit={this.handleSubmit}>
                            <textarea
                                type="text"
                                name="desc"
                                value={this.state.desc}
                                onChange={this.handleChange}
                                placeholder="Enter description"
                            />
                            <button type='submit'>Submit</button>
                        </form>
                    </Modal>
                ) : null}
                <button onClick={this.onOpenModal}>Trigger Modal</button>
                {this.state.submittedDesc && <h1>{this.state.submittedDesc}</h1>}
            </div>
        );
    }
}
