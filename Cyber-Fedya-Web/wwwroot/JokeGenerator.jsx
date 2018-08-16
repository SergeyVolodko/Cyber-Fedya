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
                <textarea class="form-control" rows="6" id="joke"></textarea>
                <div class="row">
                    <div class="col-xs-1">
                        <button type="button" class="btn btn-secondary btn-lg">l</button>
                    </div>
                    <div class="col-xs-10">
                        <button type="button" class="btn btn-primary btn-lg btn-block">Ещё!</button>
                    </div>
                    <div class="col-xs-1">
                        <button type="button" class="btn btn-success btn-lg">^^</button>
                    </div>
                </div>
            </div>
        );
    }
}