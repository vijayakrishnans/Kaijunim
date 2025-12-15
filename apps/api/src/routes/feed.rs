use axum::{response::IntoResponse, Json};
use serde::Serialize;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Author {
    pub id: &'static str,
    pub name: &'static str,
    pub avatar_url: Option<&'static str>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FeedItem {
    pub id: &'static str,
    pub author: Author,
    pub caption: &'static str,
    pub location: &'static str,
    pub media_url: &'static str,
    pub likes: u32,
    pub comments: u32,
    pub created_at: &'static str,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct FeedResponse {
    pub items: Vec<FeedItem>,
    pub next_cursor: Option<String>,
}

pub async fn get_feed() -> impl IntoResponse {
    let items = vec![FeedItem {
        id: "post-1",
        author: Author {
            id: "user-1",
            name: "Alex Carter",
            avatar_url: None,
        },
        caption: "Exploring the city at night",
        location: "Tokyo",
        media_url: "https://placehold.co/800x450?text=Post+1",
        likes: 24,
        comments: 6,
        created_at: "2025-12-15T16:30:00Z",
    }];

    Json(FeedResponse {
        items,
        next_cursor: None,
    })
}
