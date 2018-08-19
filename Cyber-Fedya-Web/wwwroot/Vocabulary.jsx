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

                <ul class="nav nav-pills nav-justified">
                    <li class="active"><a data-toggle="pill" href="#charecters"><h1>Герои</h1></a></li>
                    <li><a data-toggle="pill" href="#nouns"><h1>Существительные</h1></a></li>
                    <li><a data-toggle="pill" href="#adjectives"><h1>Прилагательные</h1></a></li>
                    <li><a data-toggle="pill" href="#verbs"><h1>Глаголы</h1></a></li>
                    <li><a data-toggle="pill" href="#places"><h1>Места</h1></a></li>
                </ul>

                <div class="tab-content">
                    <div id="charecters" class="tab-pane fade in active">
                        <button type="button" class="btn btn-success btn-lg"><i class="fa fa-plus"></i></button>
                    </div>
                    <div id="nouns" class="tab-pane fade">
                        <button type="button" class="btn btn-success btn-lg"><i class="fa fa-plus"></i></button>
                    </div>
                    <div id="adjectives" class="tab-pane fade">
                        <button type="button" class="btn btn-success btn-lg"><i class="fa fa-plus"></i></button>
                    </div>
                    <div id="verbs" class="tab-pane fade">
                        <button type="button" class="btn btn-success btn-lg"><i class="fa fa-plus"></i></button>
                    </div>
                    <div id="places" class="tab-pane fade">
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