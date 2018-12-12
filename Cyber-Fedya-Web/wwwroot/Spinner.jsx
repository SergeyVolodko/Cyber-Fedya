class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        }
    }

    render() {
        return (
            <div className="spinner-blocker">
                <p className="spinner-text">{this.state.text}</p>
                <div className="spinner-circle fa-spin"></div>
            </div>);
    }
}