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
                <ul class="list-group">
                    <li class="list-group-item stored-joke">У Баскова такой сильный голос, что он может петь в открытый шланг</li>
                    <li class="list-group-item stored-joke">Фрикаделька - это пильмень-нудист</li>
                </ul>
            </div>
        );
    }
}