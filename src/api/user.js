module.exports = app => {

    const { existsOrError, notExistsOrError, equalsOrError } = app.src.api.validator;

    const save = async (req, res) => {
        const user = { ...req.body };
        if (req.params.id) user.cpf = req.params.id;
        try {
            existsOrError(user.cpf, 'CPF não informado.')
            existsOrError(user.name, 'Nome não informado.');
            existsOrError(user.password, 'Senha não informada.');
            const userFromDB = await app.db('users')
                .where({ cpf: user.cpf }).first();
            if (!user.cpf) {
                notExistsOrError(userFromDB, 'Usuário já foi cadastrado.');
            }
        } catch (msg) {
            return res.status(400).send(msg);
        }

        if (user.cpf) {
            app.db('users')
                .update(user)
                .where({ cpf: user.cpf })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err));
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('cpf', 'name', 'balance', 'password')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('cpf', 'name', 'balance','password')
            .where({ cpf: req.params.id })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        app.db('users')
            .where({ cpf: req.params.cpf })
            .then( res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, remove };
}