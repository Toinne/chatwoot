class Api::V2::Accounts::RookooAgentsController < Api::V1::Accounts::BaseController
  before_action :check_authorization

  def show
    agent = RookooAgents::RookooAgentService.get(permitted_params[:id])

    render json: agent
  end

  def destroy
    RookooAgents::RookooAgentService.destroy(permitted_params[:id])

    head :ok
  end

  def index
    agents = RookooAgents::RookooAgentService.all(Current.account)

    render json: agents
  end

  def create
    rookoo_agent = RookooAgents::RookooAgentService.create(permitted_params)

    render json: rookoo_agent
  end

  def permitted_params
    params.permit(:name, :description, :system_message, :account_id, :id)
  end
end
