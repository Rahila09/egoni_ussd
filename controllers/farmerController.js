const Farmer = require("./../models/farmerModel");

const createFarmer = async (req, res, next) => {
    try {
        let { name, phone_number, village, state, land_size, crops_grown } = req.body;

        // Convert all string fields to lowercase
        name = name.toLowerCase();
        village = village.toLowerCase();
        state = state.toLowerCase();
        crops_grown = crops_grown.map(crop => crop.toLowerCase()); // Convert each crop to lowercase

        const farmer = new Farmer({ name, phone_number, village, state, land_size, crops_grown });

        const savedFarmer = await farmer.save();
        res.status(200).json({
            status: "success",
            data: savedFarmer
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getFarmersByCriteria = async (req, res, next) => {
    try {
        let { state, min_land_size, max_land_size, crops_grown } = req.query;
        
        // Convert query parameters to lowercase if they exist
        state = state ? state.toLowerCase() : state;
        crops_grown = crops_grown ? crops_grown.toLowerCase().split(',') : crops_grown;

        let query = {};

        // Add criteria to the query object if they are provided
        if (state) query.state = state;
        if (min_land_size && max_land_size) {
            query.land_size = { $gte: parseFloat(min_land_size), $lte: parseFloat(max_land_size) };
        } else if (min_land_size) {
            query.land_size = { $gte: parseFloat(min_land_size) };
        } else if (max_land_size) {
            query.land_size = { $lte: parseFloat(max_land_size) };
        }
        if (crops_grown) query.crops_grown = { $in: crops_grown };

        const farmers = await Farmer.find(query, { state: 1, village: 1, land_size: 1, crops_grown: 1, _id: 0 });

        if (farmers.length === 0) {
            return res.status(404).json({ message: 'No farmers found matching the criteria' });
        }

          // Capitalize the fields in the response
          const capitalizedFarmers = farmers.map(farmer => ({
            state: farmer.state.charAt(0).toUpperCase() + farmer.state.slice(1),
            village: farmer.village.charAt(0).toUpperCase() + farmer.village.slice(1),
            land_size: farmer.land_size,
            crops_grown: farmer.crops_grown.map(crop => crop.charAt(0).toUpperCase() + crop.slice(1))
        }));

        res.status(200).json({
            status: "success",
            data: capitalizedFarmers
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to retrieve all farmers from the database
const getAllFarmers = async (req, res, next) => {
    try {
        const farmers = await Farmer.find();

        // if (farmers.length === 0) {
        //     return res.status(404).json({ message: 'No farmers found in the database' });
        // }

        res.status(200).json({
            status: "success", 
            data: farmers
          })    
        } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createFarmer,
    getFarmersByCriteria,
    getAllFarmers
}
