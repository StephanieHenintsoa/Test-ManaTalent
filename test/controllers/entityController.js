const Entity = require('../models/Entity');

exports.getAllEntities = async (req, res) => {
  try {
    const entities = await Entity.findAll();
    res.status(200).json(entities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.getEntityById = async (req, res) => {
  try {
    const { id } = req.params;
    const entity = await Entity.findByPk(id);
    if (!entity) {
      return res.status(404).json({ message: 'Entité non trouvée' });
    }
    res.status(200).json(entity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.createEntity = async (req, res) => {
  try {
    const { name_entity, description } = req.body;
    if (!name_entity) {
      return res.status(400).json({ message: 'name_entity est requis' });
    }
    const newEntity = await Entity.create({ name_entity, description });
    res.status(201).json(newEntity);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.updateEntity = async (req, res) => {
  try {
    const { id } = req.params;
    const { name_entity, description } = req.body;
    const entity = await Entity.findByPk(id);
    if (!entity) {
      return res.status(404).json({ message: 'Entité non trouvée' });
    }
    await entity.update({ name_entity, description });
    res.status(200).json({ message: 'Entité mise à jour', entity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.deleteEntity = async (req, res) => {
  try {
    const { id } = req.params;
    const entity = await Entity.findByPk(id);
    if (!entity) {
      return res.status(404).json({ message: 'Entité non trouvée' });
    }
    await entity.destroy();
    res.status(200).json({ message: 'Entité supprimée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};