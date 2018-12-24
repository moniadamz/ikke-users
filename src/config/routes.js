
module.exports = app => {
    
    app.route('/users')
        .post(app.src.api.user.save)
        .get(app.src.api.user.get)

    app.route('/users/:id')
        .put(app.src.api.user.save)
        .get(app.src.api.user.getById)
        .delete(app.src.api.user.remove)
    }