class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name: ""
        };
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        const name = e.target.value;
        this.setState({ name })
    }
    render() {
        const name = this.state.name;
        return (
            <div>
            <input type="text" value={name} onChange={this.onChange}/>
        <h1>Hello { name }!</h1>
        </div>
    );
    }
}
ReactDOM.render(<App />, document.getElementById('root'));