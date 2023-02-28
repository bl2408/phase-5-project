class Admin::TagsController < Admin::ApplicationController

    def index
        tags = Tag.all

        keywords = tags_param[:keywords] unless tags_param[:keywords].nil?

        tags = tags.where("lower(label) LIKE :search", search: "%#{keywords.downcase}%") unless keywords.nil?

        query_total = tags.order("label ASC")

        query_total = query_total.map { |tag| tag.attributes.merge({count: tag.targets.count})} unless params[:count].nil?

    
        # query_total = { **query_total, target_count: Tag.joins(:taggables).group(:target_type).size } unless params[:count].nil?

        res(
            data: query_total,
            meta:  params[:count].nil? ? nil : { target_count: Tag.joins(:taggables).group(:target_type).size },
            status: :ok,
        )
    end

    def create
        tag = Tag.create!({label: tags_param[:label], description: tags_param[:description], slug: tags_param[:slug]})
        res(
            data: tag,
            status: :ok
        )
    end

    def update
        tag = Tag.find_by(id: params[:id])
        tag.update!({label: tags_param[:label], description: tags_param[:description], slug: tags_param[:slug]})
        res(
            data: tag,
            status: :ok
        )
    end

    def show
        tag = Tag.find_by(slug: params[:slug])
        meta = Tag.where(label: tag.label).joins(:taggables).group(:target_type).size

        res(
            data: Admin::TagsSerializer.new(tag),
            meta: meta,
            status: :ok
        )
    end

    def destroy
        items = !!params[:items] ? params[:items] : params[:id]
        Tag.destroy(items)
        render :no_content, status: :ok
    end

    private

    def tags_param
        params.permit(:keywords, :count, :label, :description, :slug)
    end
    
end

