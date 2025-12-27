use axum::{
    routing::{get, post},
    Router,
};

use crate::AppState;

pub mod conversations;
pub mod feed;
pub mod jobs;
pub mod products;
pub mod profile;
pub mod tutorials;

pub fn api_router() -> Router<AppState> {
    Router::<AppState>::new().nest("/v1", v1_router())
}

fn v1_router() -> Router<AppState> {
    Router::<AppState>::new()
        .route("/feed", get(feed::get_feed))
        .nest("/products", products::router())
        .nest("/jobs", jobs::router())
        .nest("/tutorials", tutorials::router())
        .nest("/profile", profile::router())
        .nest("/conversations", conversations::router())
        .route("/messages", post(conversations::create_message))
}
