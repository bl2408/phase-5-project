# frozen_string_literal: true
namespace 'db' do
    desc "Purge ActiveStorage files and resets DB"
    task :reset2 => :environment do
        puts "Removing files"
        dir = "storage"
        Dir["#{dir}/*"].each { | file | FileUtils.rm_r(file, secure: true) unless file == "#{dir}/seed_files"}
        Rake::Task["db:reset"].invoke
    end

end



