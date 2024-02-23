const foodModel = require('./../models/foodModel');

const createCommodity = async (req, res, next) => {
    try {
        const { name, prices } = req.body;
        const commodity = new foodModel({ name, prices });
        const savedCommodity = await commodity.save();
        res.json(savedCommodity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const sendCommodity = async (req, res, next) => {
    try {
        let { name, prices } = req.body;

        // Convert name to lowercase
        name = name.toLowerCase();

        // Convert quantity of each price object to lowercase
        prices = prices.map(price => ({
            quantity: price.quantity.toLowerCase(),
            price: price.price
        }));

        const commodity = new foodModel({ name, prices });
        const savedCommodity = await commodity.save();
        res.status(200).json(savedCommodity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const retrieveAveragePrice = async (req, res, next) => {
    try {
        const { name, quantity } = req.body;

        // Convert name and quantity to lowercase
        const commodityName = name.toLowerCase();
        const commodityQuantity = quantity.toLowerCase();

        // Find all documents with the given commodity name and quantity
        const matchingCommodities = await foodModel.find({ 
            name: commodityName,
            'prices.quantity': commodityQuantity
        });

        if (matchingCommodities.length === 0) {
            return res.status(404).json({ message: 'No documents found matching the criteria' });
        }

        // Calculate the average price
        let totalPrices = 0;
        let totalDocuments = 0;

        matchingCommodities.forEach(commodity => {
            const matchingPrice = commodity.prices.find(price => price.quantity.toLowerCase() === commodityQuantity);
            if (matchingPrice) {
                totalPrices += matchingPrice.price;
                totalDocuments++;
            }
        });

        const averagePrice = (totalPrices / totalDocuments).toFixed(2);

        res.status(200).json({ price: averagePrice, 
         message: `The price for ${commodityName} with ${commodityQuantity}, is ${averagePrice} `});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllCommodity = async (req, res, next) => {
        try {
            const commodities = await foodModel.find();
            res.json(commodities);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    
}

const getCommodity = async (req, res, next) => {
    try {
        const commodityName = req.body.name
        const commodity = await foodModel.findOne({ name: commodityName });

        if (!commodity) {
            return res.status(404).json({ message: 'Commodity not found' });
        }

        res.json(commodity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

module.exports = {
    createCommodity,
    getAllCommodity,
    getCommodity,
    sendCommodity,
    retrieveAveragePrice
}