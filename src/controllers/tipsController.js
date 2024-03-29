const Tip = require('./../models/Tip.js')
const Sequelize = require('sequelize');

class TipController {

    findTips = async (req, res) => {
        try {
            const tips = await Tip.findAll();
            return res.status(200).json(tips);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    findTipByUUID = async (req, res) => {
        const { UUID } = req.params;
        try {
            const tip = await Tip.findOne({
                where: {
                    UUID: UUID
                }
            });
            if (!tip) {
                return res.status(404).json({ message: `Dica com o UUID ${UUID} não encontrada` });
            } else {
                return res.status(200).json(tip);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    createTip = async (req, res) => {
        const tip = req.body;
        try {
            const newTip = await Tip.create(tip);
            return res.status(200).json(newTip);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    updateTip = async (req, res) => {
        const { UUID } = req.params;
        const newData = req.body;
        try {

            for (const key in newData) {
                if (newData[key] === "" || newData[key] === null || newData[key].trim === "") {
                    return res.status(400).json({ message: `Não é possível fazer uma requisição com campos vazios` });
                }
            }

            if (!newData) {
                return res.status(400).json({ message: `Você Não Pode Fazer uma requisição Vazia` })
            } else {            
                    await Tip.update(newData, {
                        where: {
                            UUID: UUID
                        }
                    })}
            const updatedTip = await Tip.findOne({
                where: {
                    UUID: UUID
                }
            });

            if(!updatedTip) {
                return res.status(404).json({ message: `Dica com o UUID ${UUID} não encontrada` });
            }
            
            return res.status(200).json(updatedTip);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    deleteTip = async (req, res) => {
        const { UUID } = req.params;
        try {

            const tip = await Tip.findOne({
                where: {
                    UUID: UUID
                }
            });

            if (!tip) {
                return res.status(404).json({ message: `Dica com o UUID ${UUID} Não Encontrada` });
            } else {
                await Tip.destroy({
                    where: {
                        UUID: UUID
                    }
                })
            }
            return res.status(200).json({ message: `Dica com o UUID ${UUID} Deletada` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

}

module.exports = new TipController();

