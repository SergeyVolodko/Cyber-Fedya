class FavoriteJokes extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            jokes: props.jokes
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.jokes === this.state.jokes) {
            return;
        }
        this.setState({
            jokes: nextProps.jokes
        });
    }

    render() {
        var jokes = this.state.jokes.map((joke, i) =>
            <li className="list-group-item stored-joke">{joke}</li>
            , this
        );

        return (
            <div>
                <h3>Сохранённые шедевры</h3>
                <ul className="list-group">
                    {jokes}
                </ul>
            </div>
        );
    }
}