class JokeGenerator extends React.Component{

    constructor() {
        super();
        this.state = {
            selectedProvince: ""
        };
    }

    render() {
        return (
            <div>
                <h3>Лэтc гоу - поехали!</h3>
                <textarea class="form-control generated-joke-text" id="joke" rows="10"></textarea>
                <div class="row">
                    <div class="col-xs-2">
                        <button type="button" class="btn btn-secondary btn-lg generator-button"><i class="fa fa-backward"/></button>
                    </div>
                    <div class="col-xs-8">
                        <button type="button" class="btn btn-primary btn-lg generator-button">
                            <h2>Ещё!</h2>
                        </button>
                    </div>
                    <div class="col-xs-2">
                        <button type="button" class="btn btn-success btn-lg generator-button"><i class="fa fa-save"></i></button>
                    </div>
                </div>
            </div>
        );
    }
}