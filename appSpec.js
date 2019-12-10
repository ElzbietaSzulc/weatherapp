describe('Testing the functionality, click on temperature', () => {
    it('should change temperature to fahrenheit', () => {
        let todo = new ToDo();
        let item = {
            title: "get milk",
            complete: false
        }

        expect(todo.getItems().length).toBe(1);
    })
})