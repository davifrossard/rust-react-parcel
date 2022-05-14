use ndarray::Array;
use ndarray_rand::rand_distr::Uniform;
use ndarray_rand::RandomExt;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_random(
    rows: Option<usize>,
    cols: Option<usize>,
    mean: Option<f32>,
    std: Option<f32>,
) -> f64 {
    let rows_ = rows.unwrap_or(1000);
    let cols_ = cols.unwrap_or(1000);
    let mean_ = mean.unwrap_or(1.);
    let std_ = std.unwrap_or(0.1);

    let x = Array::random((rows_, cols_), Uniform::new(0., 1.));

    x.sum().into()
}
