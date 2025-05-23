<?php

declare(strict_types=1);

/**
 * NOTICE OF LICENSE.
 *
 * UNIT3D Community Edition is open-sourced software licensed under the GNU Affero General Public License v3.0
 * The details is bundled with this project in the file LICENSE.txt.
 *
 * @project    UNIT3D Community Edition
 *
 * @author     Roardom <roardom@protonmail.com>
 * @license    https://www.gnu.org/licenses/agpl-3.0.en.html/ GNU Affero General Public License v3.0
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Auditable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Occupation.
 *
 * @property int    $id
 * @property int    $position
 * @property string $name
 */
class Occupation extends Model
{
    use Auditable;

    /** @use HasFactory<\Database\Factories\OccupationFactory> */
    use HasFactory;

    /**
     * Indicates If The Model Should Be Timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<TmdbPerson, $this>
     */
    public function people(): \Illuminate\Database\Eloquent\Relations\BelongsToMany
    {
        return $this->belongsToMany(TmdbPerson::class, 'tmdb_credits');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<TmdbCredit, $this>
     */
    public function credits(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(TmdbCredit::class);
    }
}
