framework 'ApplicationServices'
require 'lib/jog_dial'

class JogDialApp
  def call(env)
    amount = env['QUERY_STRING'].to_i
    JogDial.scroll(amount)
    # puts "Scrolled #{amount}"

    [200, { 'Content-Type' => 'text/plain' }, "Scrolled #{amount}"]
  end
end

use Rack::Static, :urls => ["/css", "/js", "/index.html"], :root => "public"

run JogDialApp.new
