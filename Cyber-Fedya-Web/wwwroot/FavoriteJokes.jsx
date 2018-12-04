class FavoriteJokes extends React.Component{

    constructor() {
        super();
        this.state = {
            selectedProvince: ""
        };
    }

    render() {
        return (
            <div>
                <h3>Сохранённые шедевры</h3>
                <ul className="list-group">
                    <li className="list-group-item stored-joke">У Баскова такой сильный голос, что он может петь в открытый шланг</li>
                    <li className="list-group-item stored-joke">Фрикаделька - это пильмень-нудист</li>
                </ul>
            </div>
        );
    }
}