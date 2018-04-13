import merge from 'lodash.merge'
const testData = {message: 'hello'}

// These are generic methods used in the generic controllers for all models
export const controllers = {
  createOne(model, body) {
    console.log('createOne')
    return Promise.resolve(testData)
  },

  updateOne(docToUpdate, update) {
    console.log('updateOne')
    return Promise.resolve(testData)
  },

  deleteOne(docToDelete) {
    console.log('deleteOne')
    return Promise.resolve(testData)
  },

  getOne(docToGet) {
    console.log('getOne')
    return Promise.resolve(testData)
  },

  getAll(model) {
    console.log('getAll')
    return Promise.resolve(testData)
  },

  findByParam(model, id) {
    console.log('findByParam')
    return Promise.resolve(testData);
  }
}

export const createOne = (model) => (req, res, next) => {
  return controllers.createOne(model, req.body)
      .then(result => res.json(result))
      .catch(e => res.status(400).send('Error Bad request!'))
}

export const updateOne = (model) => async (req, res, next) => {

}

export const deleteOne = (model) => (req, res, next) => {

}

export const getOne = (model) => (req, res, next) => {
  return controllers.getOne(model)
      .then(result => res.json(result))
}

export const getAll = (model) => (req, res, next) => {
  return controllers.getAll(model)
      .then(result => res.json(result))
}

export const findByParam = (model) => (req, res, next, id) => {
  console.log('findByParam:id', id);
  return controllers.findByParam(model, id)
      .then(()=>{
        req.toto = {};
        next();
      })
}


export const generateControllers = (model, overrides = {}) => {
  console.log('generateControllers', getAll(model))
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model)
  }

  return {...defaults, ...overrides}
}
