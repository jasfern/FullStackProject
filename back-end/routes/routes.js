const express = require("express");
const router = express.Router();
const GeocacheSchema = require("../models/Geocache.js");
const CollectionSchema = require("../models/Collection.js");

// CRUD for Geoches

// Read entire DB
router.get("/cache/all", (req, res) => {
  GeocacheSchema.find({})
    //'then' happens if find is succesful
    .then((Geocaches) => {
      res.json(Geocaches);
    })
    //if theres an error, 'catch' happens instead
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// Get single cache by id
router.get("/cache/:id", (req, res) => {
  GeocacheSchema.findById(req.params.id)
    .then((geocache) => {
      res.json(geocache);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});
//
// Get single collection by id
router.get("/collectionbyid/:id", (req, res) => {
  CollectionSchema.findById(req.params.id)
    .then((coll) => {
      res.json(coll);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});


// Create single item
router.post("/cache/create", (req, res) => {
  GeocacheSchema.create([
    {
      name: req.body.name,
      gcode: req.body.gcode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      hint: req.body.hint,
      found: req.body.found,
      cachetype: req.body.cachetype
    },
  ])
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// Update, id goes in URL body has updates
router.put("/cache/update/:id", (req, res) => {
  GeocacheSchema.findByIdAndUpdate(req.params.id, req.body)

    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Delete cache by ID
router.delete("/cache/delete/:id", (req, res) => {
  GeocacheSchema.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Delete ALL (Careful!)
router.delete("/cache/all", (req, res) => {
  GeocacheSchema.deleteMany()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// Get all collections
router.get("/collection/all", (req, res) => {
  CollectionSchema.find({})
    //'then' happens if find is succesful
    .then((collections) => {
      res.json(collections);
    })
    //if theres an error, 'catch' happens instead
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});
// Create a new collection
router.post("/collection/create", (req, res) => {
  // Create it with an empty list
  CollectionSchema.create([
    {
      name: req.body.name,
      caches: []
    },
  ])
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Add cache to collection
router.put("/collection/addcache/:id/:cacheid", (req, res) => {
  const cid = req.params.id
  CollectionSchema.findById(cid)
    .then((collection) => {
      GeocacheSchema.findById(cid)
        .then((cache) => {
          if (!collection.caches.includes(cid)) {
              // if cache is not in the list, add it
            collection.caches.push(cid)
            collection.save()
          }
          res.json(collection);
        }).
        catch((err) => {
          console.log(err);
          res.json(err);
        })
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Remove cache from collection
router.put("/collection/removecache/:id/:cacheid", (req, res) => {
  const cid = req.params.id
  CollectionSchema.findById(cid)
    .then((collection) => {
      GeocacheSchema.findById(cid)
        .then((cache) => {
          // check if the cache is in the list
          if (collection.caches.includes(cid)) {
            // if cache is in the list, remove it
            collection.splice(collection.indexOf(cid), 1);
            collection.save()
          }
          res.json(collection);
        }).
        catch((err) => {
          console.log(err);
          res.json(err);
        })
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});
// Delete ALL Collections (Careful!)
router.delete("/collection/all", (req, res) => {
  CollectionSchema.deleteMany()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Update collection
router.put("/collection/update/:id", (req, res) => {
  GeocacheSchema.findByIdAndUpdate(req.params.id, req.body)

    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
