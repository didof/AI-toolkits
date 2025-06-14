# Crawl4AI RAG

> This is a fork of [coleam00/ottomator-agents](https://github.com/coleam00/ottomator-agents/blob/main/crawl4AI-agent-v2/README.md)

## Setup

Get the code:

```bash
git clone git@github.com:didof/videos-support-repos.git
cd crawl4ai-rag
```

Setup the repo:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
playwright install
```

Start the UI:

```bash
streamlit run streamlit_app.py
```