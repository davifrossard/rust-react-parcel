use js_sys::Array;
use s2::r1::interval::Interval as R1Interval;
use s2::rect::Rect;
use s2::region::RegionCoverer;
use s2::s1::interval::Interval as S1Interval;
use std::convert::TryInto;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Coverer {
    level: u8,
    coverer: RegionCoverer,
}

#[wasm_bindgen]
impl Coverer {
    /// Create a new coverer object.
    ///
    /// # Arguments
    /// * `level` - S2 covering level
    /// * `max_cells` - Maximum number of cells to use for covering
    #[wasm_bindgen(constructor)]
    pub fn new(level: u8, max_cells: usize) -> Coverer {
        Coverer {
            level,
            coverer: RegionCoverer {
                min_level: level,
                max_level: level,
                level_mod: 1,
                max_cells,
            },
        }
    }

    /// Returns the list of cells tokens that produce a covering of a LatLng rectangle.
    ///
    /// # Arguments
    ///
    /// * `min_lat` - Minimum latitude
    /// * `min_lon` - Minimum longitude
    /// * `max_lat` - Maximum latitude
    /// * `max_lon` - Maximum longitude
    pub fn get_covering(&self, min_lat: f64, min_lon: f64, max_lat: f64, max_lon: f64) -> Array {
        let lat = R1Interval {
            lo: min_lat.to_radians(),
            hi: max_lat.to_radians(),
        };
        let lng = S1Interval {
            lo: min_lon.to_radians(),
            hi: max_lon.to_radians(),
        };
        let rect = Rect { lat, lng };
        let covering = self.coverer.covering(&rect);

        let res = Array::new_with_length(covering.0.len().try_into().unwrap());
        for (i, v) in covering.0.iter().enumerate() {
            res.set(
                i.try_into().unwrap(),
                JsValue::from_str(v.parent(self.level.into()).to_token().as_str()),
            );
        }
        res
    }
}
