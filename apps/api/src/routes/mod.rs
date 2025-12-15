use axum::{routing::get, Router};

use crate::AppState;

pub mod feed;

pub fn api_router() -> Router<AppState> {
    Router::<AppState>::new().nest("/v1", v1_router())
}

fn v1_router() -> Router<AppState> {
    Router::<AppState>::new().route("/feed", get(feed::get_feed))
}
