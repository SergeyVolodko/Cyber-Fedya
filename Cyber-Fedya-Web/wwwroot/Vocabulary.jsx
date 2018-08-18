class Vocabulary extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selectedProvince: ""
        };
    }

    render() {
        return (
            <div>
                <h3>Федин словарный запас</h3>
                <div class="row">
                    <div class="col-xs-8">
                        <select></select>
                    </div>
                    <div class="col-xs-1">
                        <button type="button" class="btn btn-success btn-lg"><i class="fa fa-plus"></i></button>
                    </div>
                </div>
            </div>
        );
    }


    componentDidMount() {
        var v = apiService.getVocabulary();
    }
}