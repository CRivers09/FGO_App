const getState = scope => {
	return {
        store: {
            frontline: {
                0: null,
                1: null,
                2: null
            }
        },
        actions: {
            fetchFrontlineServant(id, place) {
                fetch(["http://localhost:8000/api/servant/list/", id].join())
                    .then(response => response.json())
                    .then(data => {
                        let { store } = scope.state;
                        if (place > 0 && place < 4) {
                            store.frontline[place] = data;
                        }
                        else return;
                        this.setState({ store });
                    })
                    .catch(error => console.log(error));
            }
        }
    };
};