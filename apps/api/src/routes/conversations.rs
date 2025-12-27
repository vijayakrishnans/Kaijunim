use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::IntoResponse,
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};

use crate::AppState;

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Participant {
    pub id: &'static str,
    pub name: &'static str,
    pub avatar_url: &'static str,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Conversation {
    pub id: &'static str,
    pub participants: Vec<Participant>,
    pub last_message_preview: &'static str,
    pub unread_count: u32,
    pub updated_at: &'static str,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Sender {
    pub id: &'static str,
    pub name: &'static str,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct Message {
    pub id: String,
    pub conversation_id: String,
    pub sender: Sender,
    pub body: String,
    pub created_at: &'static str,
    pub status: &'static str,
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

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct SendMessageRequest {
    pub conversation_id: String,
    pub body: String,
}

pub fn router() -> Router<AppState> {
    Router::<AppState>::new()
        .route("/", get(list_conversations))
        .route("/:id/messages", get(list_messages))
}

async fn list_conversations() -> Json<ListResponse<Conversation>> {
    Json(ListResponse {
        items: sample_conversations(),
        next_cursor: None,
    })
}

async fn list_messages(Path(id): Path<String>) -> impl IntoResponse {
    let mut messages: Vec<Message> = sample_messages()
        .into_iter()
        .filter(|message| message.conversation_id == id)
        .collect();

    if messages.is_empty() {
        return Err((StatusCode::NOT_FOUND, "Conversation not found"));
    }

    while messages.len() < 6 {
        if let Some(last) = messages.last().cloned() {
            let new_id = format!("{}-{}", last.id, messages.len());
            messages.push(Message { id: new_id, ..last });
        } else {
            break;
        }
    }

    Ok(Json(ListResponse {
        items: messages,
        next_cursor: None,
    }))
}

pub async fn create_message(
    State(_state): State<AppState>,
    Json(payload): Json<SendMessageRequest>,
) -> impl IntoResponse {
    let response = Message {
        id: format!("msg-{}", 10_000 + payload.body.len()),
        conversation_id: payload.conversation_id,
        sender: Sender {
            id: "profile-1",
            name: "Alex Carter",
        },
        body: payload.body,
        created_at: "2025-01-18T12:00:00Z",
        status: "sent",
    };

    (StatusCode::CREATED, Json(DetailResponse { item: response }))
}

fn sample_conversations() -> Vec<Conversation> {
    vec![
        Conversation {
            id: "conv-1",
            participants: vec![
                Participant {
                    id: "profile-1",
                    name: "Alex Carter",
                    avatar_url: "https://placehold.co/96x96?text=AC",
                },
                Participant {
                    id: "profile-2",
                    name: "Lina Park",
                    avatar_url: "https://placehold.co/96x96?text=LP",
                },
            ],
            last_message_preview: "Loved the LUTs — can we bundle them?",
            unread_count: 2,
            updated_at: "2025-01-18T09:45:00Z",
        },
        Conversation {
            id: "conv-2",
            participants: vec![
                Participant {
                    id: "profile-1",
                    name: "Alex Carter",
                    avatar_url: "https://placehold.co/96x96?text=AC",
                },
                Participant {
                    id: "profile-3",
                    name: "Nora Castillo",
                    avatar_url: "https://placehold.co/96x96?text=NC",
                },
            ],
            last_message_preview: "Sending over the ambient stems tonight.",
            unread_count: 0,
            updated_at: "2025-01-17T20:10:00Z",
        },
        Conversation {
            id: "conv-3",
            participants: vec![
                Participant {
                    id: "profile-1",
                    name: "Alex Carter",
                    avatar_url: "https://placehold.co/96x96?text=AC",
                },
                Participant {
                    id: "profile-4",
                    name: "Studio Neon",
                    avatar_url: "https://placehold.co/96x96?text=SN",
                },
            ],
            last_message_preview: "Mockups ready for review — want a call?",
            unread_count: 1,
            updated_at: "2025-01-16T18:30:00Z",
        },
        Conversation {
            id: "conv-4",
            participants: vec![
                Participant {
                    id: "profile-1",
                    name: "Alex Carter",
                    avatar_url: "https://placehold.co/96x96?text=AC",
                },
                Participant {
                    id: "profile-5",
                    name: "Indie Arcade Lab",
                    avatar_url: "https://placehold.co/96x96?text=AL",
                },
            ],
            last_message_preview: "We greenlit the OST budget.",
            unread_count: 0,
            updated_at: "2025-01-15T14:05:00Z",
        },
        Conversation {
            id: "conv-5",
            participants: vec![
                Participant {
                    id: "profile-1",
                    name: "Alex Carter",
                    avatar_url: "https://placehold.co/96x96?text=AC",
                },
                Participant {
                    id: "profile-6",
                    name: "Glowwave",
                    avatar_url: "https://placehold.co/96x96?text=GW",
                },
            ],
            last_message_preview: "Assets delivered in the shared folder.",
            unread_count: 3,
            updated_at: "2025-01-14T11:40:00Z",
        },
        Conversation {
            id: "conv-6",
            participants: vec![
                Participant {
                    id: "profile-1",
                    name: "Alex Carter",
                    avatar_url: "https://placehold.co/96x96?text=AC",
                },
                Participant {
                    id: "profile-7",
                    name: "Creators Guild",
                    avatar_url: "https://placehold.co/96x96?text=CG",
                },
            ],
            last_message_preview: "Can you host a workshop next month?",
            unread_count: 0,
            updated_at: "2025-01-13T08:55:00Z",
        },
    ]
}

fn sample_messages() -> Vec<Message> {
    vec![
        Message {
            id: "msg-1".to_string(),
            conversation_id: "conv-1".to_string(),
            sender: Sender {
                id: "profile-2",
                name: "Lina Park",
            },
            body: "Hey Alex! Your LUT pack is gorgeous. Would you consider a creator license?"
                .to_string(),
            created_at: "2025-01-18T09:20:00Z",
            status: "read",
        },
        Message {
            id: "msg-2".to_string(),
            conversation_id: "conv-1".to_string(),
            sender: Sender {
                id: "profile-1",
                name: "Alex Carter",
            },
            body: "Thanks Lina! I can add a bundle with the transitions too.".to_string(),
            created_at: "2025-01-18T09:30:00Z",
            status: "read",
        },
        Message {
            id: "msg-3".to_string(),
            conversation_id: "conv-1".to_string(),
            sender: Sender {
                id: "profile-2",
                name: "Lina Park",
            },
            body: "Perfect. Could you share a preview?".to_string(),
            created_at: "2025-01-18T09:40:00Z",
            status: "delivered",
        },
        Message {
            id: "msg-10".to_string(),
            conversation_id: "conv-1".to_string(),
            sender: Sender {
                id: "profile-1",
                name: "Alex Carter",
            },
            body: "Uploading a teaser clip now.".to_string(),
            created_at: "2025-01-18T09:50:00Z",
            status: "sent",
        },
        Message {
            id: "msg-11".to_string(),
            conversation_id: "conv-1".to_string(),
            sender: Sender {
                id: "profile-2",
                name: "Lina Park",
            },
            body: "Got it! This works great.".to_string(),
            created_at: "2025-01-18T10:00:00Z",
            status: "delivered",
        },
        Message {
            id: "msg-12".to_string(),
            conversation_id: "conv-1".to_string(),
            sender: Sender {
                id: "profile-1",
                name: "Alex Carter",
            },
            body: "I'll bundle the license doc for you.".to_string(),
            created_at: "2025-01-18T10:10:00Z",
            status: "read",
        },
        Message {
            id: "msg-4".to_string(),
            conversation_id: "conv-2".to_string(),
            sender: Sender {
                id: "profile-3",
                name: "Nora Castillo",
            },
            body: "Ambient stems are rendering now. Uploading tonight.".to_string(),
            created_at: "2025-01-17T19:50:00Z",
            status: "read",
        },
        Message {
            id: "msg-5".to_string(),
            conversation_id: "conv-2".to_string(),
            sender: Sender {
                id: "profile-1",
                name: "Alex Carter",
            },
            body: "Amazing, I'll prep the mix session.".to_string(),
            created_at: "2025-01-17T20:05:00Z",
            status: "delivered",
        },
        Message {
            id: "msg-6".to_string(),
            conversation_id: "conv-3".to_string(),
            sender: Sender {
                id: "profile-4",
                name: "Studio Neon",
            },
            body: "Mockups are ready, let me know if you want a quick call.".to_string(),
            created_at: "2025-01-16T18:20:00Z",
            status: "sent",
        },
        Message {
            id: "msg-7".to_string(),
            conversation_id: "conv-4".to_string(),
            sender: Sender {
                id: "profile-5",
                name: "Indie Arcade Lab",
            },
            body: "Budget got approved. Let's lock scope and milestones.".to_string(),
            created_at: "2025-01-15T13:55:00Z",
            status: "read",
        },
        Message {
            id: "msg-8".to_string(),
            conversation_id: "conv-5".to_string(),
            sender: Sender {
                id: "profile-6",
                name: "Glowwave",
            },
            body: "Delivered assets to the shared drive.".to_string(),
            created_at: "2025-01-14T11:30:00Z",
            status: "delivered",
        },
        Message {
            id: "msg-9".to_string(),
            conversation_id: "conv-6".to_string(),
            sender: Sender {
                id: "profile-7",
                name: "Creators Guild",
            },
            body: "Could you host a workshop next month?".to_string(),
            created_at: "2025-01-13T08:40:00Z",
            status: "sent",
        },
    ]
}
