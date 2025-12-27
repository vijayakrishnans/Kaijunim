use axum::{http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::{cors::CorsLayer, trace::TraceLayer};
use tracing::info;

mod routes;

#[derive(Clone, Default)]
struct AppState {}

#[derive(Serialize)]
struct HealthResponse {
    status: &'static str,
}

async fn healthcheck() -> impl IntoResponse {
    (StatusCode::OK, Json(HealthResponse { status: "ok" }))
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .init();

    let state = AppState::default();

    let app = Router::new()
        .route("/health", get(healthcheck))
        .nest("/api", routes::api_router())
        .with_state(state)
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http());

    let addr: SocketAddr = "0.0.0.0:4000".parse()?;
    info!("listening on {}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
