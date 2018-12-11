class FavoriteJokes extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            jokes: props.jokes
        };
        jokes_instance = this;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.jokes === jokes_instance.state.jokes) {
            return;
        }
        jokes_instance.setState({
            jokes: nextProps.jokes
        });
    }

    render() {
        var jokes = jokes_instance.state.jokes.map((joke, i) =>
            <li key={i} className="list-group-item stored-joke">{joke}</li>
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