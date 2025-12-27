use axum::{extract::Path, http::StatusCode, response::IntoResponse, routing::get, Json, Router};
use serde::Serialize;

use crate::AppState;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Seller {
    pub id: &'static str,
    pub name: &'static str,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Discount {
    pub percent: u8,
    pub start: &'static str,
    pub end: &'static str,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Metrics {
    pub views: u32,
    pub likes: u32,
    pub sales: u32,
    pub rating: f32,
    pub reviews_count: u32,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Product {
    pub id: &'static str,
    pub seller: Seller,
    pub title: &'static str,
    pub description: &'static str,
    pub price: f32,
    pub category: &'static str,
    pub r#type: &'static str,
    pub preview_url: &'static str,
    pub tags: Vec<&'static str>,
    pub status: &'static str,
    pub discount: Option<Discount>,
    pub metrics: Metrics,
    pub featured: bool,
    pub created_at: &'static str,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ListResponse<T> {
    pub items: Vec<T>,
    pub next_cursor: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DetailResponse<T> {
    pub item: T,
}

pub fn router() -> Router<AppState> {
    Router::<AppState>::new()
        .route("/", get(list_products))
        .route("/:id", get(get_product))
}

async fn list_products() -> Json<ListResponse<Product>> {
    Json(ListResponse {
        items: sample_products(),
        next_cursor: None,
    })
}

async fn get_product(Path(id): Path<String>) -> impl IntoResponse {
    sample_products()
        .into_iter()
        .find(|product| product.id == id)
        .map(|product| Json(DetailResponse { item: product }))
        .ok_or_else(|| (StatusCode::NOT_FOUND, "Product not found"))
}

fn sample_products() -> Vec<Product> {
    vec![
        Product {
            id: "prod-101",
            seller: Seller {
                id: "seller-1",
                name: "Lina Park",
            },
            title: "Cinematic LUT Pack",
            description: "40 handcrafted LUTs optimized for Rec.709 with log variants.",
            price: 49.0,
            category: "photography",
            r#type: "digital",
            preview_url: "https://placehold.co/640x360?text=LUT+Pack",
            tags: vec!["color", "cinematic", "video"],
            status: "active",
            discount: Some(Discount {
                percent: 20,
                start: "2025-01-10T00:00:00Z",
                end: "2025-02-10T00:00:00Z",
            }),
            metrics: Metrics {
                views: 18420,
                likes: 1250,
                sales: 840,
                rating: 4.8,
                reviews_count: 310,
            },
            featured: true,
            created_at: "2024-12-01T12:00:00Z",
        },
        Product {
            id: "prod-102",
            seller: Seller {
                id: "seller-2",
                name: "Ethan Moore",
            },
            title: "Retro Game UI Kit",
            description: "Pixel-perfect UI components for retro-themed games and overlays.",
            price: 35.0,
            category: "games",
            r#type: "digital",
            preview_url: "https://placehold.co/640x360?text=Retro+UI",
            tags: vec!["ui", "pixel", "pack"],
            status: "active",
            discount: None,
            metrics: Metrics {
                views: 9420,
                likes: 640,
                sales: 410,
                rating: 4.6,
                reviews_count: 150,
            },
            featured: false,
            created_at: "2025-01-05T08:20:00Z",
        },
        Product {
            id: "prod-103",
            seller: Seller {
                id: "seller-3",
                name: "Nora Castillo",
            },
            title: "Ambient Soundscape Bundle",
            description: "60 royalty-free ambient tracks for streams, films, and games.",
            price: 29.0,
            category: "music",
            r#type: "audio",
            preview_url: "https://placehold.co/640x360?text=Soundscapes",
            tags: vec!["audio", "ambient", "loop"],
            status: "active",
            discount: Some(Discount {
                percent: 15,
                start: "2025-01-15T00:00:00Z",
                end: "2025-02-01T00:00:00Z",
            }),
            metrics: Metrics {
                views: 13200,
                likes: 720,
                sales: 520,
                rating: 4.7,
                reviews_count: 190,
            },
            featured: false,
            created_at: "2024-11-20T15:10:00Z",
        },
        Product {
            id: "prod-104",
            seller: Seller {
                id: "seller-4",
                name: "Kai Freeman",
            },
            title: "VTuber Overlay Suite",
            description: "Stream overlay system with animated alerts, panels, and chat frames.",
            price: 59.0,
            category: "software",
            r#type: "bundle",
            preview_url: "https://placehold.co/640x360?text=Overlay+Suite",
            tags: vec!["streaming", "overlay", "vtuber"],
            status: "active",
            discount: None,
            metrics: Metrics {
                views: 22110,
                likes: 1380,
                sales: 1020,
                rating: 4.9,
                reviews_count: 420,
            },
            featured: true,
            created_at: "2025-01-12T18:45:00Z",
        },
        Product {
            id: "prod-105",
            seller: Seller {
                id: "seller-5",
                name: "Studio Neon",
            },
            title: "Storyboarding Template Pack",
            description:
                "Figma and PDF templates for cinematic storyboarding with grids and notes.",
            price: 19.0,
            category: "art",
            r#type: "template",
            preview_url: "https://placehold.co/640x360?text=Storyboard",
            tags: vec!["figma", "template", "film"],
            status: "active",
            discount: Some(Discount {
                percent: 10,
                start: "2025-01-18T00:00:00Z",
                end: "2025-02-05T00:00:00Z",
            }),
            metrics: Metrics {
                views: 8600,
                likes: 410,
                sales: 260,
                rating: 4.4,
                reviews_count: 90,
            },
            featured: false,
            created_at: "2024-12-10T10:00:00Z",
        },
        Product {
            id: "prod-106",
            seller: Seller {
                id: "seller-6",
                name: "Nova Scripts",
            },
            title: "After Effects Transition Pack",
            description: "30 seamless motion transitions with project files and presets.",
            price: 42.0,
            category: "software",
            r#type: "preset",
            preview_url: "https://placehold.co/640x360?text=AE+Transitions",
            tags: vec!["motion", "ae", "transitions"],
            status: "active",
            discount: None,
            metrics: Metrics {
                views: 17400,
                likes: 940,
                sales: 680,
                rating: 4.7,
                reviews_count: 230,
            },
            featured: false,
            created_at: "2025-01-02T09:30:00Z",
        },
    ]
}
