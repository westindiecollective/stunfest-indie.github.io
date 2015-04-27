#!/bin/ruby

# Public: Generate markdown files for each games registered on Intrazik.

require 'date'

# Private: generate a markdown file from an entry
def generate(raw, d)

  fields = raw.split('";"')

  studio = fields[0]
  name = fields[2]
  description = fields[3]
  platforms = fields[4]
  website = fields[6]
  video = fields[7]
  screen1 = fields[8]
  screen2 = fields[9]
  screen3 = fields[10]
  boxart = fields[11]
  release = fields[12]

  # Cleans
  safename = String.new(name)
  safename.gsub!(/^.*(\\|\/)/, '')

  # Special cases
  safename.gsub!('û', 'u')
  safename.gsub!('é', 'e')
  safename.gsub!('è', 'e')
  safename.gsub!('ê', 'e')
  safename.gsub!('à', 'a')

  safename.gsub!(/[^0-9A-Za-z.\-]/, '_')

  safename.gsub!(/__+/, "_")

  release.gsub!(/^.*(:)/, '')

  if safename[safename.length - 1] == "_" then
    safename[safename.length - 1] = ''
  end

  puts name + " by " + studio + " ("+release+")"

  f = File.new("generated/#{d.strftime '%Y-%m-%d'}-"+safename+".md", "w")

  f.write "---\n"
  f.write "title:     #{name}\n"
  f.write "website:   #{website}\n"
  f.write "studio:    #{studio}\n"
  f.write "platforms: #{platforms}\n"
  f.write "screen1:   #{screen1}\n"
  f.write "screen2:   #{screen2}\n"
  f.write "screen3:   #{screen3}\n"
  f.write "boxart:    #{boxart}\n"
  f.write "video:     #{video}\n"
  f.write "release:   #{release}\n"
  f.write "---\n"
  f.write "\n"
  f.write "#{description}"

  f.close

end

# Check parameters
if ARGV.length < 1 then
  puts "Usage: ruby inrazik2md.rb <export.csv>"
  exit -1
end

# Create output folder
if Dir.exists?('generated') == false then
  Dir.mkdir 'generated'
end

# Read all entries and store as string
csv = File.open(ARGV[0], "r")
data = csv.read
csv.close

# Clean
data=data.gsub(/\r/, '')

# Fucking piece of shitty csv!!!!!!!!!!!
# Newlines inside rows so I had to find a hack to detect entry. FUCK
columns = data.split(/;"";"";"""/)

date = Date.new(2015,1,1)
count = 1
columns.each do |c|

  if count > 1 then
    generate(c, date)
  end
  count += 1
  date += 3

end
