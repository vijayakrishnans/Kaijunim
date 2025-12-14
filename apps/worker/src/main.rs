use chrono::{DateTime, Utc};
use tokio::time::{sleep, Duration};
use tracing::info;

async fn cleanup_expired_media() -> anyhow::Result<()> {
  let now: DateTime<Utc> = Utc::now();
  info!("cleanup tick at {}", now);
  Ok(())
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
  tracing_subscriber::fmt()
    .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
    .init();

  loop {
    cleanup_expired_media().await?;
    sleep(Duration::from_secs(600)).await;
  }
}
