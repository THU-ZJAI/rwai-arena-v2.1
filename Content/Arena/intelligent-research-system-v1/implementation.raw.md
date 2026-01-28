# Implementation Guide - 实施指南

## Implementation Guide 实施指南

This blueprint guides you through building an intelligent research and report generation system that achieves DeepResearch Bench score of 51.86 (ranked #2). The system reduces human labor by 95% with report generation time ≤15 minutes.

本指南指导您构建智能研究和报告生成系统，该系统在DeepResearch基准测试中获得51.86分（排名第2）。系统将人工工作减少95%，报告生成时间≤15分钟。

---

## System Architecture 系统架构

### Architecture Components 架构组件

1. **Query Interface 查询接口**
   - User input for research topics and requirements
   - 用户输入研究主题和需求

2. **Agent Orchestrator 智能体协调器**
   - Claude Code agents coordinate research workflow
   - Claude Code智能体协调研究工作流

3. **Model Selection Layer 模型选择层**
   - Routes tasks to GLM 4.7 or MiniMax-M2 based on domain
   - 根据领域路由任务到GLM 4.7或MiniMax-M2

4. **RAG Layer 检索增强层**
   - Retrieves relevant knowledge from vector database
   - 从向量数据库检索相关知识

5. **Research Engine 研究引擎**
   - Multi-model system for information gathering and synthesis
   - 多模型信息收集和综合系统

6. **Report Generator 报告生成器**
   - Automated report writing and formatting
   - 自动报告编写和格式化

7. **Quality Validator 质量验证器**
   - Ensures report accuracy and completeness
   - 确保报告准确性和完整性

---

## Research Workflow 研究工作流

### Step-by-Step Process 分步流程

#### English

1. **User submits research query** 用户提交研究查询
   - Define research topic and scope
   - Specify output format and requirements

2. **Agent analyzes requirements** 智能体分析需求
   - Plans research approach
   - Identifies data sources needed

3. **RAG retrieves background** RAG检索背景
   - Searches vector database for relevant knowledge
   - Loads context and historical data

4. **Models perform research** 模型执行研究
   - Multi-source information gathering
   - Cross-reference and validation

5. **Synthesize information** 综合信息
   - Merge findings from multiple sources
   - Structure information logically

6. **Generate report** 生成报告
   - Write with proper structure and citations
   - Format in Markdown/Word/PDF

7. **Quality check** 质量检查
   - Validate accuracy and completeness
   - Human review and approval

#### 中文

1. **用户提交研究查询**
   - 定义研究主题和范围
   - 指定输出格式和要求

2. **智能体分析需求**
   - 规划研究方法
   - 识别所需数据源

3. **RAG检索背景知识**
   - 搜索向量数据库获取相关知识
   - 加载上下文和历史数据

4. **模型执行研究**
   - 多源信息收集
   - 交叉引用和验证

5. **综合信息**
   - 合并多个来源的发现
   - 逻辑化构建信息结构

6. **生成报告**
   - 按正确结构和引用编写
   - 格式化为Markdown/Word/PDF

7. **质量检查**
   - 验证准确性和完整性
   - 人工审核和批准

---

## Tech Stack Details 技术栈详情

### Core Components 核心组件

#### AI/ML Models AI/ML模型

```yaml
Primary Model:
  name: "Claude 3.5 Sonnet"
  provider: "Anthropic"
  use_case: "Complex reasoning and synthesis"

Alternative Models:
  - GLM 4.7 (Zhipu AI)
  - MiniMax-M2 (MiniMax)
```

#### Framework 框架

```yaml
Main Framework:
  - Claude Code (Anthropic)
  - Model Context Protocol (MCP)

Orchestration:
  - LangChain
  - AutoGPT
```

#### Data Sources 数据源

**English**:
- Web search APIs (Google, Bing)
- Academic databases (arXiv, PubMed)
- Industry reports (Gartner, Forrester)
- Internal knowledge bases

**中文**:
- 网络搜索API（Google、百度）
- 学术数据库（arXiv、知网）
- 行业报告（Gartner、Forrester）
- 内部知识库

---

## Installation & Setup 安装与设置

### Prerequisites 先决条件

#### English

**Required 必需**:
- Node.js 18+
- Python 3.9+
- Anthropic API key
- OpenAI API key (optional, for alternative models)

**Recommended 推荐**:
- 8GB RAM minimum
- 50GB storage
- Stable internet connection

#### 中文

**必需**:
- Node.js 18+
- Python 3.9+
- Anthropic API密钥
- OpenAI API密钥（可选，用于替代模型）

**推荐**:
- 最小8GB RAM
- 50GB存储空间
- 稳定的网络连接

### Installation Steps 安装步骤

#### Step 1: Install Claude Code

```bash
# Install globally via npm
npm install -g @anthropic-ai/claude-code

# Verify installation
claude-code --version
```

#### Step 2: Configure API Keys

```bash
# Set up Anthropic API key
claude-code auth login

# Or set environment variable
export ANTHROPIC_API_KEY="sk-ant-..."
```

#### Step 3: Clone Repository

```bash
git clone https://github.com/THU-ZJAI/Real-World-AI.git
cd intelligent-research-system-v1
```

#### Step 4: Install Dependencies

```bash
# Backend dependencies
pip install -r requirements.txt

# Frontend dependencies (optional web interface)
npm install
```

#### Step 5: Configure Environment

```bash
cp .env.example .env
# Edit .env with your API keys and settings
```

---

## Configuration 配置

### Environment Variables 环境变量

```env
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Alternative Models (optional)
OPENAI_API_KEY=sk-openai-your-key-here

# Database (for vector store)
DATABASE_URL=postgresql://user:password@localhost:5432/research_db
VECTOR_DB_URL=postgresql://user:password@localhost:5432/vector_db

# Search APIs
GOOGLE_SEARCH_API_KEY=your-key
GOOGLE_SEARCH_CX=your-cx

# Output Settings
DEFAULT_OUTPUT_FORMAT=markdown
MAX_RESEARCH_DEPTH=10
QUALITY_THRESHOLD=0.8
```

---

## Usage 使用指南

### Basic Query 基础查询

#### English

```bash
# Simple research query
claude-code "Research the latest developments in quantum computing"

# Specific format requirement
claude-code "Analyze Tesla's Q4 2024 earnings and create a 3-page report in PDF format"

# Academic research
claude-code "Literature review on large language model alignment techniques from 2022-2024"
```

#### 中文

```bash
# 简单研究查询
claude-code "研究量子计算的最新发展"

# 特定格式要求
claude-code "分析特斯拉2024年Q4财报，创建3页PDF格式报告"

# 学术研究
claude-code "关于2022-2024年大语言模型对齐技术的文献综述"
```

### Advanced Usage 高级用法

#### Custom Research Scope 自定义研究范围

```python
from research_system import ResearchEngine

engine = ResearchEngine()

# Configure research parameters
config = {
    "depth": 15,  # Research depth
    "sources": ["academic", "industry", "news"],
    "language": "en",
    "citations": "APA",
    "max_pages": 50
}

# Execute research
result = engine.research(
    query="Impact of AI on healthcare industry",
    config=config
)
```

---

## Deployment 部署

### Cloud Deployment 云端部署

#### English

**Option 1: Quick Start (Cloud API)**
- Use hosted Claude Code API
- Minimal setup required
- Pay-per-use pricing

**Option 2: Docker Deployment**

```bash
# Build Docker image
docker build -t intelligent-research .

# Run container
docker run -p 8000:8000 \
  -e ANTHROPIC_API_KEY=$API_KEY \
  intelligent-research
```

#### 中文

**选项1: 快速启动（Cloud API）**
- 使用托管的Claude Code API
- 最小设置要求
- 按需付费

**选项2: Docker部署**

```bash
# 构建Docker镜像
docker build -t intelligent-research .

# 运行容器
docker run -p 8000:8000 \
  -e ANTHROPIC_API_KEY=$API_KEY \
  intelligent-research
```

### On-Premise Deployment 本地部署

#### English

**Requirements**:
- Self-hosted LLM (local Claude Code or alternative)
- Private MCP servers
- Internal network

**Setup**:
1. Deploy local model server
2. Configure MCP connections
3. Set up internal knowledge base
4. Configure security and access controls

#### 中文

**需求**:
- 自托管LLM（本地Claude Code或替代方案）
- 私有MCP服务器
- 内部网络

**设置**:
1. 部署本地模型服务器
2. 配置MCP连接
3. 建立内部知识库
4. 配置安全和访问控制

---

## Performance Optimization 性能优化

### Caching Strategy 缓存策略

#### English

- **Query Cache**: Store research results for 24 hours
- **Vector Cache**: Cache RAG retrieval results
- **Model Cache**: Cache model responses

#### 中文

- **查询缓存**: 存储研究结果24小时
- **向量缓存**: 缓存RAG检索结果
- **模型缓存**: 缓存模型响应

### Quality Assurance 质量保证

#### English

**Validation Checks**:
- Source credibility scoring
- Information cross-referencing
- Fact-checking algorithms
- Citation verification

#### 中文

**验证检查**:
- 来源可信度评分
- 信息交叉引用
- 事实检查算法
- 引文验证

---

## Troubleshooting 故障排除

### Common Issues 常见问题

#### Issue 1: Slow Response Time

**English**:
**Problem**: Research takes longer than 15 minutes
**Solution**:
- Reduce research depth
- Limit number of sources
- Enable caching
- Use faster model for initial research

**中文**:
**问题**: 研究时间超过15分钟
**解决方案**:
- 减少研究深度
- 限制数据源数量
- 启用缓存
- 使用更快的模型进行初始研究

#### Issue 2: Low Quality Results

**English**:
**Problem**: Generated report lacks depth or accuracy
**Solution**:
- Increase research depth
- Add more diverse sources
- Improve RAG retrieval
- Enable multi-model validation

**中文**:
**问题**: 生成的报告缺乏深度或准确性
**解决方案**:
- 增加研究深度
- 添加更多样化的来源
- 改进RAG检索
- 启用多模型验证

---

## Best Practices 最佳实践

### Query Optimization 查询优化

#### English

1. **Be Specific**: Clearly define research scope
2. **Set Requirements**: Specify format, length, depth
3. **Use Examples**: Provide sample output for reference
4. **Iterate**: Refine query based on initial results

#### 中文

1. **具体明确**: 清晰定义研究范围
2. **设定要求**: 指定格式、长度、深度
3. **使用示例**: 提供输出样本供参考
4. **迭代优化**: 根据初步结果优化查询

### Quality Control 质量控制

#### English

- Always review generated reports
- Verify citations and sources
- Cross-check critical information
- Use human-in-the-loop for important research

#### 中文

- 始终审查生成的报告
- 验证引用和来源
- 交叉检查关键信息
- 重要研究使用人在回路中

---

## Notes for Content Team
- 实施指南提供详细的技术步骤
- 包含代码示例和配置
- 中英文对照
- 涵盖部署选项和优化策略
- 确保所有命令经过验证
