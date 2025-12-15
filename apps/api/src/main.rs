// use axum::{extract::State, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
// use serde::Serialize;
// use std::net::SocketAddr;
// use tower_http::{cors::CorsLayer, trace::TraceLayer};
// use tracing::info;

// #[derive(Clone, Default)]
// struct AppState {}

// #[derive(Serialize)]
// struct HealthResponse {
//     status: &'static str,
// }

// async fn healthcheck() -> impl IntoResponse {
//     (StatusCode::OK, Json(HealthResponse { status: "ok" }))
// }

// async fn sample_products(State(_state): State<AppState>) -> impl IntoResponse {
//     #[derive(Serialize)]
//     struct Product {
//         id: &'static str,
//         title: &'static str,
//         price: f32,
//     }
//     let items = vec![
//         Product { id: "prod-1", title: "Digital asset pack 1", price: 29.0 },
//         Product { id: "prod-2", title: "Digital asset pack 2", price: 34.0 },
//     ];
//     Json(items)
// }

// #[tokio::main]
// async fn main() -> anyhow::Result<()> {
//     dotenvy::dotenv().ok();
//     tracing_subscriber::fmt()
//         .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
//         .init();

//     let state = AppState::default();

//     let app = Router::new()
//         .route("/health", get(healthcheck))
//         .route("/products", get(sample_products))
//         .with_state(state)
//         .layer(CorsLayer::permissive())
//         .layer(TraceLayer::new_for_http());

//     let addr: SocketAddr = "0.0.0.0:4000".parse()?;
//     info!("listening on {}", addr);
//     axum::Server::bind(&addr).serve(app.into_make_service()).await?;
//     Ok(())
// }
use axum::{extract::State, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
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

async fn sample_products(State(_state): State<AppState>) -> impl IntoResponse {
    #[derive(Serialize)]
    struct Product {
        id: &'static str,
        title: &'static str,
        price: f32,
    }

    let items = vec![
        Product {
            id: "prod-1",
            title: "Digital asset pack 1",
            price: 29.0,
        },
        Product {
            id: "prod-2",
            title: "Digital asset pack 2",
            price: 34.0,
        },
    ];

    Json(items)
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
        .route("/products", get(sample_products))
        .nest("/api", routes::api_router())
        .with_state(state)
        .layer(CorsLayer::permissive())
        .layer(TraceLayer::new_for_http());

    let addr: SocketAddr = "0.0.0.0:4000".parse()?;
    info!("listening on {}", addr);

    // ✅ Axum 0.7+ way
    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
